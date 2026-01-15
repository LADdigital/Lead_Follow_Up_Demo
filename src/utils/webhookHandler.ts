import type { WebhookResponse, ChatMessage, BackgroundActivity } from '../types';

export const processWebhookResponse = (
  response: WebhookResponse,
  currentTime: Date = new Date(),
  backgroundActivity?: BackgroundActivity
): ChatMessage | null => {
  // Validate response structure
  if (!response) {
    console.error('Webhook response is null or undefined');
    return null;
  }

  if (!response.role) {
    console.error('Webhook response missing role field:', response);
    return null;
  }

  if (!response.message) {
    console.error('Webhook response missing message field:', response);
    return null;
  }

  // Ensure message is not empty or just whitespace
  const trimmedMessage = response.message.trim();
  if (!trimmedMessage) {
    console.error('Webhook response has empty message:', response);
    return null;
  }

  const messageType = response.role === 'assistant' ? 'assistant' : 'customer';

  console.log('Processing webhook response:', {
    role: response.role,
    messageType,
    messageLength: trimmedMessage.length,
    hasMultipleLines: trimmedMessage.includes('\n'),
    customerName: response.customer_name,
  });

  return {
    id: `${Date.now()}-${Math.random()}`,
    type: messageType,
    text: trimmedMessage,
    timestamp: currentTime,
    senderName:
      messageType === 'customer' ? response.customer_name : 'Assistant',
    backgroundActivity: messageType === 'assistant' ? backgroundActivity : undefined,
  };
};

export const shouldStopConversation = (response: any): boolean => {
  if (!response) return true;
  if (response === 'STOP') return true;
  if (typeof response === 'string' && response.trim() === '') return true;
  if (response && response.role === 'stop') return true;
  return false;
};

export const sendCustomerAgentWebhook = async (
  sessionId: string,
  customerName: string,
  salesperson: string,
  lastAssistantMessage: string
): Promise<WebhookResponse | null> => {
  const customerAgentUrl =
    'https://hook.us2.make.com/a9rgjzjbal3xfxysnbpngyyjeu7moh1h';

  const payload = {
    session_id: sessionId,
    customer_profile: {
      name: customerName,
      personality: 'neutral, realistic dealership customer',
    },
    salesperson: salesperson,
    last_assistant_message: lastAssistantMessage,
  };

  try {
    console.log('Sending customer agent webhook:', payload);
    const response = await fetch(customerAgentUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`Customer agent returned status ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log('Customer agent response:', data);
    return data;
  } catch (error) {
    console.error('Customer agent webhook failed:', error);
    return null;
  }
};

export const sendCustomerMessageToAssistant = async (
  sessionId: string,
  customerName: string,
  salesperson: string,
  message: string
): Promise<WebhookResponse | null> => {
  const assistantUrl =
    'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb';

  const payload = {
    session_id: sessionId,
    role: 'customer',
    customer_name: customerName,
    salesperson: salesperson,
    message: message,
  };

  try {
    console.log('Forwarding customer message to assistant:', payload);
    const response = await fetch(assistantUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`Assistant webhook returned status ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log('Assistant response to customer message:', data);
    return data;
  } catch (error) {
    console.error('Forwarding customer message failed:', error);
    return null;
  }
};
