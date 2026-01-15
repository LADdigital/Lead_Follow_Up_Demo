import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, RefreshCw, X } from 'lucide-react';
import type { Lead } from '../utils/leadGenerator';

interface LeadControlPanelProps {
  lead: Lead | null;
  sessionId: string;
  onGenerateLead: (source: 'website' | 'kbb_ico' | 'cargurus' | 'autotrader') => void;
  onRefresh: () => void;
  onMobileClose?: () => void;
}

const leadSources = [
  { label: 'Website Form', value: 'website' as const },
  { label: 'KBB ICO', value: 'kbb_ico' as const },
  { label: 'CarGurus', value: 'cargurus' as const },
  { label: 'AutoTrader', value: 'autotrader' as const },
];

export const LeadControlPanel: React.FC<LeadControlPanelProps> = ({
  lead,
  sessionId,
  onGenerateLead,
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

  const handleLeadSourceSelect = (source: 'website' | 'kbb_ico' | 'cargurus' | 'autotrader') => {
    onGenerateLead(source);
    setDropdownOpen(false);
  };

  return (
    <div className="h-full bg-neutral-50 dark:bg-[#141414] flex flex-col border-l border-neutral-200 dark:border-neutral-800">
      {/* Mobile Close Button */}
      {onMobileClose && (
        <button
          onClick={onMobileClose}
          className="lg:hidden absolute top-4 right-4 z-50 p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </button>
      )}

      {/* Header */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
          Lead Generation
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Generate a new lead from various sources
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Lead Generation Button with Dropdown */}
        <div className="space-y-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-between group"
            >
              <span>Generate New Lead</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                {leadSources.map((source) => (
                  <button
                    key={source.value}
                    onClick={() => handleLeadSourceSelect(source.value)}
                    className="w-full px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white transition-colors border-b border-neutral-100 dark:border-neutral-800 last:border-b-0"
                  >
                    {source.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onRefresh}
            className="w-full px-4 py-3 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Demo</span>
          </button>
        </div>

        {/* Lead Details */}
        {lead && (
          <div className="space-y-4">
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                Current Lead
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Source:</span>
                <div className="mt-1 text-neutral-900 dark:text-white">{lead.channel}</div>
              </div>

              <div>
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Customer:</span>
                <div className="mt-1 text-neutral-900 dark:text-white">{lead.customer_name}</div>
              </div>

              <div>
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Email:</span>
                <div className="mt-1 text-neutral-900 dark:text-white break-all">{lead.email}</div>
              </div>

              <div>
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Phone:</span>
                <div className="mt-1 text-neutral-900 dark:text-white">{lead.phone}</div>
              </div>

              <div>
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Contact Preference:</span>
                <div className="mt-1 text-neutral-900 dark:text-white">{lead.preferred_contact_method}</div>
              </div>

              {lead.vehicle_of_interest !== 'N/A' && (
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Vehicle of Interest:</span>
                  <div className="mt-1 text-neutral-900 dark:text-white">{lead.vehicle_of_interest}</div>
                </div>
              )}

              <div>
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Message:</span>
                <div className="mt-1 text-neutral-900 dark:text-white">{lead.message}</div>
              </div>

              {lead.kbb_offer && (
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-3">
                  <h4 className="text-neutral-900 dark:text-white font-semibold mb-2">KBB Offer Details</h4>

                  <div className="space-y-2">
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium">Vehicle:</span>
                      <div className="mt-1 text-neutral-900 dark:text-white">
                        {lead.kbb_offer.vehicle.year} {lead.kbb_offer.vehicle.make} {lead.kbb_offer.vehicle.model} {lead.kbb_offer.vehicle.trim}
                      </div>
                    </div>

                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium">Color:</span>
                      <div className="mt-1 text-neutral-900 dark:text-white">{lead.kbb_offer.vehicle.color}</div>
                    </div>

                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium">Mileage:</span>
                      <div className="mt-1 text-neutral-900 dark:text-white">{lead.kbb_offer.vehicle.mileage.toLocaleString()} miles</div>
                    </div>

                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium">Offer Amount:</span>
                      <div className="mt-1 text-green-600 dark:text-green-400 font-semibold text-base">
                        ${lead.kbb_offer.offer_amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Session Info */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
            Session Info
          </h3>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono break-all">
            {sessionId}
          </div>
        </div>
      </div>
    </div>
  );
};
