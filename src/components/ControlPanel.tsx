import React, { useState, useRef, useEffect } from 'react';
import { Zap, AlertCircle, RotateCcw, ChevronDown } from 'lucide-react';
import type { DemoContext, SystemStatus, TriggerType } from '../types';

interface ControlPanelProps {
  context: DemoContext;
  systemStatus: SystemStatus;
  sessionId: string;
  onTrigger: (type: TriggerType) => void;
  onRefresh: () => void;
  onMobileClose?: () => void;
}

const FOLLOWUP_OPTIONS: Array<{ label: string; value: TriggerType }> = [
  { label: 'One Week Follow-Up', value: 'one_week_followup' },
  { label: 'Two Week Follow-Up', value: 'two_week_followup' },
  { label: 'One Month Follow-Up', value: 'one_month_followup' },
  { label: 'Two Months Follow-Up', value: 'two_months_followup' },
  { label: 'Three Months Follow-Up', value: 'three_months_followup' },
  { label: 'Six Months Follow-Up', value: 'six_months_followup' },
  { label: 'One Year Follow-Up', value: 'one_year_followup' },
  { label: 'Birthday Follow-Up', value: 'birthday_followup' },
  { label: 'Christmas Follow-Up', value: 'christmas_followup' },
  { label: "New Year's Follow-Up", value: 'new_years_followup' },
  { label: 'Thanksgiving Follow-Up', value: 'thanksgiving_followup' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  context,
  systemStatus,
  onTrigger,
  onRefresh,
  onMobileClose,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleTrigger = (type: TriggerType) => {
    onTrigger(type);
    setDropdownOpen(false);
    if (onMobileClose && window.innerWidth < 1024) {
      setTimeout(onMobileClose, 300);
    }
  };

  const handleRefresh = () => {
    onRefresh();
    if (onMobileClose && window.innerWidth < 1024) {
      setTimeout(onMobileClose, 300);
    }
  };
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0A0A0A] dark:to-[#1A1A1A] overflow-y-auto">
      {/* Header - Modern elevated design */}
      <div className="sticky top-0 px-4 py-3 lg:px-6 lg:py-4 bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] z-10 shadow-sm dark:shadow-modern-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-wide">Control</h2>
          <button
            onClick={handleRefresh}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#3A3A3A] rounded-mobile-sm shadow-sm hover:shadow-modern-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Refresh"
            aria-label="Refresh demo"
          >
            <RotateCcw size={18} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Trigger Controls Section - Modern card design */}
      <div className="px-4 py-4 lg:px-6 lg:py-5 border-b border-gray-200 dark:border-[#2D2D2D]">
        <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
          Triggers
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => handleTrigger('new_sale')}
            className="w-full px-4 py-3.5 min-h-[48px] bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-mobile hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-modern-sm hover:shadow-modern-md"
          >
            <Zap size={16} />
            New Sold Follow-Up
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-3.5 min-h-[48px] bg-gradient-to-r from-slate-600 to-slate-700 dark:from-[#3A3A3A] dark:to-[#4A4A4A] text-white text-sm font-semibold rounded-mobile hover:from-slate-700 hover:to-slate-800 dark:hover:from-[#4A4A4A] dark:hover:to-[#5A5A5A] active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-modern-sm hover:shadow-modern-md"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <Zap size={16} />
              Follow-Up Campaigns
              <ChevronDown size={16} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2D2D2D] rounded-mobile shadow-modern-lg border border-gray-200 dark:border-[#3A3A3A] overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                {FOLLOWUP_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTrigger(option.value)}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3A3A] active:bg-gray-200 dark:active:bg-[#4A4A4A] transition-colors border-b border-gray-100 dark:border-[#3A3A3A] last:border-b-0 min-h-[44px] flex items-center"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Context Section - Modern card layout */}
      <div className="px-4 py-4 lg:px-6 lg:py-5 border-b border-gray-200 dark:border-[#2D2D2D]">
        <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
          Context
        </h3>
        {context.customerName ? (
        <div className="space-y-5 text-sm">
          <div className="bg-white dark:bg-[#2D2D2D] p-4 rounded-mobile shadow-modern-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">
              Customer
            </p>
            <p className="text-gray-900 dark:text-gray-100 font-semibold text-base">{context.customerName}</p>
          </div>
          <div className="bg-white dark:bg-[#2D2D2D] p-4 rounded-mobile shadow-modern-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">
              Vehicle
            </p>
            <p className="text-gray-900 dark:text-gray-100 font-semibold text-base">{context.vehicle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-[#2D2D2D] p-4 rounded-mobile shadow-modern-sm">
              <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">
                Purchased
              </p>
              <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                {context.purchaseDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="bg-white dark:bg-[#2D2D2D] p-4 rounded-mobile shadow-modern-sm">
              <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">
                Days Ago
              </p>
              <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                {context.timeSincePurchase}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#2D2D2D] p-4 rounded-mobile shadow-modern-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">
              Salesperson
            </p>
            <p className="text-gray-900 dark:text-gray-100 font-semibold text-base">{context.salesperson}</p>
          </div>
          <div className="bg-white dark:bg-[#2D2D2D] p-4 rounded-mobile shadow-modern-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">
              Channel
            </p>
            <p className="text-gray-900 dark:text-gray-100 font-semibold text-base">{context.channel}</p>
          </div>
        </div>
        ) : (
          <p className="text-sm text-gray-400 py-4"></p>
        )}
      </div>

      {/* System Status Section - Modern card with better visual hierarchy */}
      <div className="px-4 py-4 lg:px-6 lg:py-5">
        <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
          Status
        </h3>
        <div className="bg-white dark:bg-[#2D2D2D] rounded-mobile border border-gray-200 dark:border-[#3A3A3A] p-5 space-y-4 shadow-modern-sm">
          {systemStatus.ruleActivated ? (
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-mobile-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0 shadow-sm"></div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Rule Activated</p>
                <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold truncate">
                  {systemStatus.ruleActivated}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-[#1A1A1A] rounded-mobile-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5 flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">No Active Rule</p>
              </div>
            </div>
          )}

          {systemStatus.lastMessageTime && (
            <div className="flex items-start gap-3 pt-3 border-t border-gray-100 dark:border-[#3A3A3A]">
              <AlertCircle size={14} className="text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Last Activity</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                  {systemStatus.lastMessageTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
