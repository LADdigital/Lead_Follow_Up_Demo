import React, { useEffect, useRef } from 'react';
import { Send, ChevronRight } from 'lucide-react';
import type { ChatMessage, SystemStatus } from '../types';

interface ChatPanelProps {
  messages: ChatMessage[];
  systemStatus: SystemStatus;
  onSendMessage: (text: string) => void;
  manualMode: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  manualMode,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = React.useState(true);
  const previousMessageCountRef = useRef(messages.length);
  const previousScrollHeightRef = useRef(0);
  const [expandedBackgroundActivity, setExpandedBackgroundActivity] = React.useState<Set<string>>(new Set());

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' });
  };

  const isNearBottom = (): boolean => {
    const container = messagesContainerRef.current;
    if (!container) return true;

    const threshold = 100;
    const position = container.scrollTop + container.clientHeight;
    const bottom = container.scrollHeight;

    return bottom - position < threshold;
  };

  const isAtTop = (): boolean => {
    const container = messagesContainerRef.current;
    if (!container) return false;
    return container.scrollTop < 50;
  };

  const handleScroll = () => {
    setShouldAutoScroll(isNearBottom());

    // Detect scroll to top for loading more messages
    if (isAtTop() && messages.length > 0) {
      // This is where you'd trigger loading older messages
      // For now, we'll just handle the scroll position preservation
    }
  };

  // Handle scroll position preservation when messages are added at the top
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const currentMessageCount = messages.length;
    const previousMessageCount = previousMessageCountRef.current;

    // If messages were added (and we're not at initial load)
    if (currentMessageCount > previousMessageCount && previousMessageCount > 0) {
      // If user is scrolled up (not at bottom), preserve scroll position
      // This assumes new messages are added at the bottom (typical case)
      if (shouldAutoScroll) {
        // Auto-scroll to bottom for new messages
        scrollToBottom('smooth');
      }
    } else if (currentMessageCount === messages.length && previousMessageCount > 0) {
      // If messages were loaded at the top (would be implemented with pagination)
      // Preserve scroll position by maintaining the same element in view
      const scrollHeightDiff = container.scrollHeight - previousScrollHeightRef.current;
      if (scrollHeightDiff > 0) {
        container.scrollTop += scrollHeightDiff;
      }
    }

    previousMessageCountRef.current = currentMessageCount;
    previousScrollHeightRef.current = container.scrollHeight;
  }, [messages, shouldAutoScroll]);

  // Initial scroll to bottom on mount
  useEffect(() => {
    scrollToBottom('auto');
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      setShouldAutoScroll(true);
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const toggleBackgroundActivity = (messageId: string) => {
    setExpandedBackgroundActivity((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-[#0A0A0A] dark:to-[#1A1A1A] lg:border-r border-gray-200 dark:border-[#2D2D2D] overflow-hidden relative">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="flex flex-col items-center opacity-[0.03] dark:opacity-[0.02]">
          <img
            src="/3b18f411-3d29-485d-b553-28675abefc9d.png"
            alt=""
            className="w-64 lg:w-96 h-auto object-contain filter grayscale"
          />
          <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
            made by
          </p>
        </div>
      </div>

      {/* Messages Container - FIXED HEIGHT, scrollable inside, flexbox bottom-anchored */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-3 lg:px-8 lg:py-8 min-h-0 relative z-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="min-h-full flex flex-col justify-end gap-6 lg:gap-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center px-6">
              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-[#2D2D2D] flex items-center justify-center">
                  <Send size={32} className="text-gray-400 dark:text-gray-600" />
                </div>
                <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium">
                  No messages yet
                </p>
                <p className="text-xs lg:text-sm text-gray-400 dark:text-gray-600 mt-2">
                  {manualMode ? "Start typing to send a message" : "Enable Manual Mode or trigger a scenario"}
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === 'customer' ? 'justify-end' : 'justify-start'
                  } animate-fade-in flex-col ${
                    message.type === 'customer' ? 'items-end' : 'items-start'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-1.5 lg:mb-2 tracking-wide px-1 ${
                      message.type === 'customer'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {message.senderName || (message.type === 'customer' ? 'Customer' : 'Assistant')}
                  </p>
                  <div
                    className={`max-w-[85%] lg:max-w-md px-4 py-3 lg:px-5 lg:py-4 rounded-mobile-lg shadow-modern-sm active:scale-[0.98] transition-transform ${
                      message.type === 'customer'
                        ? 'bg-blue-600 dark:bg-blue-700 text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100 rounded-bl-md'
                    }`}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      userSelect: 'text'
                    }}
                  >
                    <p
                      className="text-base leading-relaxed break-words whitespace-pre-wrap"
                      style={{ lineHeight: '1.6', wordBreak: 'break-word' }}
                    >
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-2 lg:mt-3 font-medium ${
                        message.type === 'customer'
                          ? 'text-blue-100 dark:text-blue-200'
                          : 'text-gray-500 dark:text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {message.type === 'assistant' && message.backgroundActivity && message.backgroundActivity.actions.length > 0 && (
                    <div className="max-w-[85%] lg:max-w-md mt-2 ml-1">
                      <button
                        onClick={() => toggleBackgroundActivity(message.id)}
                        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition-colors group"
                      >
                        <ChevronRight
                          size={14}
                          className={`transition-transform ${
                            expandedBackgroundActivity.has(message.id) ? 'rotate-90' : ''
                          }`}
                        />
                        <span className="font-medium">What happened behind the scenes</span>
                      </button>

                      {expandedBackgroundActivity.has(message.id) && (
                        <div className="mt-2 pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-400 animate-fade-in">
                          {message.backgroundActivity.actions.map((action, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5">✓</span>
                              <span className="leading-relaxed">{action}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Section - FIXED at bottom, never moves */}
      <div
        className="flex-shrink-0 px-4 py-2 lg:px-8 lg:py-4 border-t border-gray-200 dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A]"
        style={{
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))'
        }}
      >
        <div className="flex gap-2 lg:gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={manualMode ? "Type a message..." : "Enable Manual Mode to type"}
            disabled={!manualMode}
            className="flex-1 px-4 py-2.5 lg:px-5 lg:py-3.5 min-h-[44px] border border-gray-300 dark:border-[#3A3A3A] bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100 rounded-mobile-pill lg:rounded-mobile focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-transparent text-base disabled:bg-gray-100 dark:disabled:bg-[#1A1A1A] disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm hover:shadow-modern-sm"
            style={{
              lineHeight: '1.5',
              fontSize: '16px',
              WebkitTapHighlightColor: 'transparent'
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || !manualMode}
            className="min-w-[44px] min-h-[44px] w-11 h-11 lg:w-auto lg:h-auto lg:px-5 lg:py-3.5 bg-blue-600 dark:bg-blue-700 text-white rounded-full lg:rounded-mobile hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-[#3A3A3A] disabled:cursor-not-allowed shadow-modern-sm hover:shadow-modern-md disabled:shadow-none active:scale-95 flex items-center justify-center"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
