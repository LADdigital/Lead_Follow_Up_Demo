import { useState, useCallback, useEffect, useRef } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { ControlPanel } from './components/ControlPanel';
import { LeadControlPanel } from './components/LeadControlPanel';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HowItWorks } from './components/HowItWorks';
import type { ChatMessage, DemoContext, SystemStatus, WebhookResponse, TriggerType, BackgroundActivity } from './types';
import {
  getEmptyContext,
  generateWebhookPayload,
} from './utils/mockData';
import { sendWebhookPlaceholder } from './utils/webhooks';
import { generateSessionId, generateRandomCustomer } from './utils/generateData';
import {
  processWebhookResponse,
  shouldStopConversation,
  sendCustomerAgentWebhook,
  sendCustomerMessageToAssistant,
} from './utils/webhookHandler';
import { generateLead, type Lead, type LeadSource } from './utils/leadGenerator';
import {
  generateTriggerBackgroundActivity,
  generateLeadBackgroundActivity,
  generateManualModeBackgroundActivity,
  generateAutomatedLoopBackgroundActivity,
} from './utils/backgroundActivity';

type DemoMode = 'post-purchase' | 'lead-followup';

function App() {
  const [demoMode, setDemoMode] = useState<DemoMode>('post-purchase');
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<DemoContext>(getEmptyContext());
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    ruleActivated: '',
    lastMessageTime: null,
    isTyping: false,
  });
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const conversationActiveRef = useRef(false);

  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [hasInitialLeadBeenSent, setHasInitialLeadBeenSent] = useState<boolean>(false);

  useEffect(() => {
    setSessionId(generateSessionId());
  }, []);

  useEffect(() => {
    setMessages([]);
    setCurrentLead(null);
    setContext(getEmptyContext());
    conversationActiveRef.current = false;
    setHasInitialLeadBeenSent(false);
  }, [demoMode]);

  const addMessage = (
    text: string,
    type: 'customer' | 'assistant',
    senderName?: string,
    backgroundActivity?: BackgroundActivity
  ): string => {
    const id = `${Date.now()}-${Math.random()}`;
    const newMessage: ChatMessage = {
      id,
      type,
      text,
      timestamp: new Date(),
      senderName,
      backgroundActivity: type === 'assistant' ? backgroundActivity : undefined,
    };
    setMessages((prev) => [...prev, newMessage]);
    return id;
  };


  const processCustomerAgentLoop = useCallback(
    async (
      lastAssistantMessage: string,
      customerName: string,
      salesperson: string,
      currentSessionId: string
    ) => {
      if (shouldStopConversation(lastAssistantMessage)) {
        conversationActiveRef.current = false;
        return;
      }

      const response = await sendCustomerAgentWebhook(
        currentSessionId,
        customerName,
        salesperson,
        lastAssistantMessage
      );

      if (shouldStopConversation(response)) {
        conversationActiveRef.current = false;
        return;
      }

      const backgroundActivityCustomer = generateAutomatedLoopBackgroundActivity(
        { customerName, salesperson, channel: 'SMS' } as DemoContext,
        true
      );
      const customerMessage = processWebhookResponse(
        response as WebhookResponse,
        new Date(),
        backgroundActivityCustomer
      );
      if (customerMessage) {
        const messageText = customerMessage.text;

        if (messageText === 'STOP') {
          conversationActiveRef.current = false;
          return;
        }

        addMessage(messageText, 'customer', customerMessage.senderName, customerMessage.backgroundActivity);
        setSystemStatus((prev) => ({
          ...prev,
          lastMessageTime: new Date(),
        }));

        const assistantResponse = await sendCustomerMessageToAssistant(
          currentSessionId,
          customerName,
          salesperson,
          messageText
        );

        if (shouldStopConversation(assistantResponse)) {
          conversationActiveRef.current = false;
          return;
        }

        const backgroundActivityAssistant = generateAutomatedLoopBackgroundActivity(
          { customerName, salesperson, channel: 'SMS' } as DemoContext,
          false
        );
        const assistantMessage = processWebhookResponse(
          assistantResponse as WebhookResponse,
          new Date(),
          backgroundActivityAssistant
        );
        if (assistantMessage) {
          addMessage(assistantMessage.text, assistantMessage.type as 'customer' | 'assistant', assistantMessage.senderName, assistantMessage.backgroundActivity);
          setSystemStatus((prev) => ({
            ...prev,
            lastMessageTime: new Date(),
          }));

          if (assistantMessage.type === 'assistant' && conversationActiveRef.current) {
            await processCustomerAgentLoop(assistantMessage.text, customerName, salesperson, currentSessionId);
          }
        }
      }
    },
    []
  );

  const handleWebhookResponse = useCallback(
    async (response: WebhookResponse, currentSessionId: string, customerName: string, salesperson: string, skipCustomerLoop: boolean = false, backgroundActivity?: BackgroundActivity) => {
      if (!response) return;

      const message = processWebhookResponse(response, new Date(), backgroundActivity);
      if (!message) return;

      if (message.text === 'STOP') {
        conversationActiveRef.current = false;
        return;
      }

      addMessage(message.text, message.type as 'customer' | 'assistant', message.senderName, message.backgroundActivity);

      setSystemStatus((prev) => ({
        ...prev,
        lastMessageTime: new Date(),
      }));

      if (message.type === 'assistant' && conversationActiveRef.current && !skipCustomerLoop) {
        await processCustomerAgentLoop(message.text, customerName, salesperson, currentSessionId);
      }
    },
    [processCustomerAgentLoop]
  );

  const handleTrigger = useCallback(
    async (triggerType: TriggerType) => {
      let newContext: DemoContext;

      const triggerLabels: Record<TriggerType, string> = {
        new_sale: 'New Sale Follow-Up',
        one_week_followup: 'One Week Check-In',
        two_week_followup: 'Two Week Check-In',
        one_month_followup: 'One Month Check-In',
        two_months_followup: 'Two Months Check-In',
        three_months_followup: 'Three Months Check-In',
        six_months_followup: 'Six Months Check-In',
        one_year_followup: 'One Year Anniversary',
        birthday_followup: 'Birthday Follow-Up',
        christmas_followup: 'Christmas Follow-Up',
        new_years_followup: "New Year's Follow-Up",
        thanksgiving_followup: 'Thanksgiving Follow-Up',
      };

      const timeRanges: Record<TriggerType, { min: number; max: number; scenario: 'recent_purchase' | 'csi_window' }> = {
        new_sale: { min: 1, max: 7, scenario: 'recent_purchase' },
        one_week_followup: { min: 5, max: 9, scenario: 'csi_window' },
        two_week_followup: { min: 12, max: 16, scenario: 'csi_window' },
        one_month_followup: { min: 28, max: 32, scenario: 'csi_window' },
        two_months_followup: { min: 58, max: 62, scenario: 'csi_window' },
        three_months_followup: { min: 88, max: 92, scenario: 'csi_window' },
        six_months_followup: { min: 178, max: 182, scenario: 'csi_window' },
        one_year_followup: { min: 360, max: 370, scenario: 'csi_window' },
        birthday_followup: { min: 30, max: 365, scenario: 'csi_window' },
        christmas_followup: { min: 30, max: 365, scenario: 'csi_window' },
        new_years_followup: { min: 30, max: 365, scenario: 'csi_window' },
        thanksgiving_followup: { min: 30, max: 365, scenario: 'csi_window' },
      };

      const range = timeRanges[triggerType];
      newContext = {
        ...generateRandomCustomer({ min: range.min, max: range.max }, range.scenario),
        channel: 'SMS',
      };

      setContext(newContext);
      conversationActiveRef.current = true;

      setSystemStatus((prev) => ({
        ...prev,
        ruleActivated: triggerLabels[triggerType],
        lastMessageTime: new Date(),
      }));

      const payload = generateWebhookPayload(sessionId, newContext, triggerType);
      const response = await sendWebhookPlaceholder(payload, triggerType);

      if (response) {
        const backgroundActivity = generateTriggerBackgroundActivity(triggerType, newContext);
        await handleWebhookResponse(
          response as WebhookResponse,
          sessionId,
          newContext.customerName,
          newContext.salesperson,
          true,
          backgroundActivity
        );
      }
    },
    [sessionId, handleWebhookResponse]
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      addMessage(text, 'customer', context.customerName);

      setSystemStatus((prev) => ({
        ...prev,
        lastMessageTime: new Date(),
      }));

      const assistantResponse = await sendCustomerMessageToAssistant(
        sessionId,
        context.customerName,
        context.salesperson,
        text
      );

      if (assistantResponse) {
        const backgroundActivity = generateManualModeBackgroundActivity(context, false);
        await handleWebhookResponse(
          assistantResponse as WebhookResponse,
          sessionId,
          context.customerName,
          context.salesperson,
          true,
          backgroundActivity
        );
      }
    },
    [sessionId, context, handleWebhookResponse]
  );

  const handleRefreshDemo = useCallback(() => {
    conversationActiveRef.current = false;
    setSessionId(generateSessionId());
    setMessages([]);
    setContext(getEmptyContext());
    setSystemStatus({
      ruleActivated: '',
      lastMessageTime: null,
      isTyping: false,
    });
  }, []);

  const handleToggleManualMode = useCallback(() => {
    setManualMode((prev) => !prev);
  }, []);

  const sendLeadWebhook = async (lead: Lead | null, customerMessage: string | null = null, isPhase1: boolean = true): Promise<WebhookResponse | null> => {
    try {
      let payload: any;

      if (isPhase1 && lead) {
        payload = {
          session_id: sessionId,
          lead,
        };
        console.log('Sending lead webhook (Phase 1):', { session_id: sessionId, lead_source: lead.lead_source, preferred_contact: lead.preferred_contact_method });
      } else {
        payload = {
          session_id: sessionId,
          message: customerMessage,
        };
        console.log('Sending lead webhook (Phase 2):', { session_id: sessionId, message: customerMessage });
      }

      const response = await fetch('https://hook.us2.make.com/mklmvql6d516n6urw11wc55y93au31tm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Lead webhook HTTP error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Lead webhook response:', data);
      return data;
    } catch (error) {
      console.error('Lead webhook error:', error);
      return null;
    }
  };

  const handleGenerateLead = useCallback(
    async (source: LeadSource) => {
      const newLead = generateLead(source);
      setCurrentLead(newLead);
      setHasInitialLeadBeenSent(false);

      const response = await sendLeadWebhook(newLead, null, true);

      if (response) {
        const backgroundActivity = generateLeadBackgroundActivity(newLead, true);
        const message = processWebhookResponse(response, new Date(), backgroundActivity);
        if (message) {
          addMessage(message.text, 'assistant', message.senderName, message.backgroundActivity);
          setSystemStatus((prev) => ({
            ...prev,
            lastMessageTime: new Date(),
          }));
          setHasInitialLeadBeenSent(true);
        }
      }
    },
    [sessionId]
  );

  const handleLeadReply = useCallback(
    async (text: string) => {
      if (!currentLead) return;

      addMessage(text, 'customer', currentLead.customer_name);

      setSystemStatus((prev) => ({
        ...prev,
        lastMessageTime: new Date(),
      }));

      const response = await sendLeadWebhook(null, text, false);

      if (response) {
        const backgroundActivity = generateLeadBackgroundActivity(currentLead, false);
        const message = processWebhookResponse(response, new Date(), backgroundActivity);
        if (message) {
          addMessage(message.text, 'assistant', message.senderName, message.backgroundActivity);
          setSystemStatus((prev) => ({
            ...prev,
            lastMessageTime: new Date(),
          }));
        }
      }
    },
    [currentLead, sessionId]
  );

  const handleRefreshLeadDemo = useCallback(() => {
    setSessionId(generateSessionId());
    setMessages([]);
    setCurrentLead(null);
    setHasInitialLeadBeenSent(false);
    setSystemStatus({
      ruleActivated: '',
      lastMessageTime: null,
      isTyping: false,
    });
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  if (showHowItWorks) {
    return <HowItWorks onClose={() => setShowHowItWorks(false)} />;
  }

  return (
    <div className="h-[100dvh] bg-white dark:bg-[#0A0A0A] flex flex-col overflow-hidden">
      <Header
        onMenuToggle={handleMenuToggle}
        menuOpen={mobileMenuOpen}
        onShowHowItWorks={() => setShowHowItWorks(true)}
      />

      {/* Tab Navigation */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0A0A0A]">
        <div className="flex">
          <button
            onClick={() => setDemoMode('post-purchase')}
            className={`px-4 py-2.5 lg:px-6 lg:py-4 text-sm lg:text-base font-medium transition-colors border-b-2 ${
              demoMode === 'post-purchase'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Post-Purchase Follow-Up Demo
          </button>
          <button
            onClick={() => setDemoMode('lead-followup')}
            className={`px-4 py-2.5 lg:px-6 lg:py-4 text-sm lg:text-base font-medium transition-colors border-b-2 ${
              demoMode === 'lead-followup'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Inbound Lead Automation Demo
          </button>
        </div>
      </div>

      {/* Main Layout - Fixed height, no auto-sizing */}
      <div className="flex-1 flex overflow-hidden relative min-h-0">
        {/* Chat Panel - Full width on mobile, 70% on desktop - FIXED HEIGHT */}
        <div className="w-full lg:w-7/10 flex-shrink-0 h-full flex flex-col">
          <ChatPanel
            messages={messages}
            systemStatus={systemStatus}
            onSendMessage={demoMode === 'lead-followup' ? handleLeadReply : handleSendMessage}
            manualMode={true}
          />
          {/* Footer - Only visible on mobile */}
          <div className="lg:hidden">
            <Footer />
          </div>
        </div>

        {/* Control Panel - Slide-out on mobile, fixed 30% on desktop */}
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={handleMenuClose}
          />
        )}

        {/* Control Panel */}
        <div
          className={`
            fixed lg:relative inset-y-0 right-0 z-40
            w-[85%] max-w-sm lg:w-3/10 lg:max-w-none
            transform transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            overflow-y-auto
            rounded-l-mobile-lg lg:rounded-none
            shadow-2xl lg:shadow-none
          `}
        >
          {demoMode === 'post-purchase' ? (
            <ControlPanel
              context={context}
              systemStatus={systemStatus}
              onTrigger={handleTrigger}
              onRefresh={handleRefreshDemo}
              sessionId={sessionId}
              onMobileClose={handleMenuClose}
            />
          ) : (
            <LeadControlPanel
              lead={currentLead}
              sessionId={sessionId}
              onGenerateLead={handleGenerateLead}
              onRefresh={handleRefreshLeadDemo}
              onMobileClose={handleMenuClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
