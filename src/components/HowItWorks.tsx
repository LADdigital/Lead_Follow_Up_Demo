import React from 'react';
import { X, ArrowLeft } from 'lucide-react';

interface HowItWorksProps {
  onClose: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#0A0A0A] overflow-y-auto">
      <div className="min-h-screen">
        <div className="sticky top-0 z-10 bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-[#2D2D2D] shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Demo</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-modern-lg hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How This Demo Works
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-8 sm:mb-12"></div>

          <div className="space-y-12 sm:space-y-16">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why This Demo Exists
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  The purpose of this demo is simple: to show how LAD Digital automates the sales follow-up process so dealership teams can stop chasing messages and focus on closing real opportunities.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Salespeople should not be spending hours every day sending:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2.5"></div>
                    <span>20+ follow-up texts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2.5"></div>
                    <span>Check-in emails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2.5"></div>
                    <span>"Just touching base" messages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2.5"></div>
                    <span>Repetitive post-sale follow-ups</span>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  That time is better spent:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Working active, ready-to-buy leads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Being on the sales floor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Engaging customers in service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Creating new opportunities</span>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                  This demo shows what happens when follow-up runs automatically, consistently, and intelligently — without sacrificing personalization or timing.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Introduction
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  This is an AI-powered follow-up assistant demo built specifically for automotive dealerships.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Unlike traditional chatbots that focus on pre-sale questions, this system manages post-sale and inbound lead conversations — the moments that determine long-term trust, repeat business, and showroom traffic.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Every interaction in this demo reflects intentional decisions around timing, tone, and restraint. The assistant knows when to reach out, how to respond naturally, and when to step aside and hand the conversation to a human salesperson.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                The Demo Process
              </h2>

              <div className="space-y-8">
                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Customer Context Creation
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        When you trigger a scenario, the system generates a realistic customer profile including name, vehicle details, timing, lead source, and preferred contact method. This context determines how the assistant communicates.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Assistant Activation
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        The assistant sends an opening message tailored to the scenario — whether that's a post-purchase follow-up, a holiday touchpoint, or an inbound lead inquiry.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Conversation Flow
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Depending on the mode:<br/>
                        • In post-purchase demo mode, the assitant sends a follow up message depending on the sold date.<br/>
                        • In inbound lead automation mode, it sends a fresh lead first touch message. In both modes YOU respond as the customer.<br/><br/>
                        All responses are handled in real time and are NOT scripted.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Intelligent Routing
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        The assistant continuously evaluates the conversation. If a lead becomes "hot," raises a concern, or needs human involvement, the system flags it and routes it to the salesperson immediately.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Smart Disengagement
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        When a conversation reaches a natural close, the assistant stops. No chasing. No filler. No awkward over-follow-up.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Training & Methodology
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  The assistant has been trained on real dealership conversations, automotive ownership questions, and sales communication best practices.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  I personally designed and trained the agent's behavior — including tone, pacing, escalation logic, and stop conditions — to reflect how experienced sales professionals actually communicate.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Design Principles
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-lg">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                    <span>Helpful, not hovering</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                    <span>Present, not pushy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                    <span>Human, not robotic</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Technical Implementation (Simplified)
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Behind the scenes, this demo uses a webhook-based automation system.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Each message:
                </p>
                <div className="bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2D2D2D] rounded-modern-lg p-6 my-6">
                  <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">1.</span>
                      <span>Sends structured context to the AI</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">2.</span>
                      <span>Evaluates intent and urgency</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">3.</span>
                      <span>Determines whether to continue, escalate, or disengage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">4.</span>
                      <span>Generates a response dynamically</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">5.</span>
                      <span>Returns both the message and routing decision</span>
                    </li>
                  </ol>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                  Messages are NOT pre-written. Every response is generated live based on the current conversation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Inbound Lead Automation Demo
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  This demo also includes an inbound lead automation mode.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  In this mode, the system simulates brand-new leads from sources like:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Website forms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>KBB Instant Cash Offer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>CarGurus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>AutoTrader</span>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  When a lead is generated:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2.5"></div>
                    <span>A full lead profile is created (source, contact method, vehicle, message)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2.5"></div>
                    <span>The assistant responds appropriately based on the channel and lead source</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2.5"></div>
                    <span>You respond manually as the customer</span>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  This demonstrates how the system:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Instantly engages new leads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Builds rapport naturally</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Adjusts message length and tone by channel (SMS vs Email)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Moves conversations toward an in-store visit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                    <span>Flags hot leads for immediate salesperson follow-up</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="pb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Business Value
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  In production, this system can manage hundreds or thousands of conversations simultaneously.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Routine follow-ups are handled automatically. High-intent leads are surfaced instantly. Sales teams spend less time typing and more time selling.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 p-6 rounded-r-modern-lg">
                  <p className="text-gray-900 dark:text-white font-semibold mb-3">
                    The result:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                      <span>More showroom visits</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                      <span>Faster response times</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                      <span>Better customer experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></div>
                      <span>Higher close rates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="pb-8 pt-8 border-t border-gray-200 dark:border-[#2D2D2D]">
              <div className="text-center">
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-2">
                  Ready to Automate Your Business?
                </p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                  Reach us at{' '}
                  <a
                    href="mailto:hello@getladdigital.com"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-2 transition-colors"
                  >
                    hello@getladdigital.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
