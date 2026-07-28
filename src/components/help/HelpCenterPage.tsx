import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Mail,
  Send,
  FileText,
  ShieldAlert,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_FAQS } from '../../data/faqData';

export const HelpCenterPage: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'faq' | 'support' | 'terms' | 'privacy'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Contact Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Payouts & Withdrawals');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = INITIAL_FAQS.filter(
    f =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      addToast({ title: 'Validation Error', message: 'Please complete all required fields.', type: 'warning' });
      return;
    }

    setSubmitted(true);
    addToast({
      title: 'Support Ticket Submitted! 🎫',
      message: 'Ticket #EP-8821 created. Our team will respond within 12 hours.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 border-l-4 border-l-indigo-600 text-white shadow-xs">
        <div className="max-w-xl">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            EarnPulse Support
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
            Help Center & Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Find instant answers to common questions or reach out to our 24/7 customer care team.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'faq'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Frequently Asked Questions
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'support'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Contact Support Ticket
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'terms'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Terms of Service
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'privacy'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Privacy Policy
        </button>
      </div>

      {/* TAB 1: FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search help topics (e.g. payout, points, survey)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map(faq => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-slate-900 dark:text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-indigo-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Support Form */}
      {activeTab === 'support' && (
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-600 shadow-xs space-y-6">
          {!submitted ? (
            <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                <span>Submit a Customer Support Ticket</span>
              </h2>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-semibold focus:outline-none"
                >
                  <option value="Payouts & Withdrawals">Payouts & Withdrawals</option>
                  <option value="Survey Disqualifications">Survey Disqualifications</option>
                  <option value="Missing Task Points">Missing Task Points</option>
                  <option value="Referral Tracking">Referral Tracking</option>
                  <option value="Account & Login Security">Account & Login Security</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ticket Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Brief summary of your query"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Provide transaction IDs or specific details so our support team can resolve your issue quickly."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket to Support</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Ticket Created (#EP-8821)
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Thank you! Our support team has received your ticket and will send updates to your email.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs"
              >
                Submit Another Inquiry
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Terms */}
      {activeTab === 'terms' && (
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-500 shadow-xs space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            EarnPulse Terms of Service
          </h2>
          <p>
            1. User Accounts: Each individual is allowed strictly one account. Multiple account creations or proxy/VPN usage to manipulate survey qualification rules is strictly prohibited and subject to account forfeiture.
          </p>
          <p>
            2. Reward Points & Conversions: EarnPulse Points carry no monetary value outside the EarnPulse platform until explicitly submitted for redemption. Conversion rates (5,000 Points = ₹500) are enforced automatically.
          </p>
          <p>
            3. Payout Processing: Approved redemptions are transmitted electronically via UPI, Amazon Gift Cards, Flipkart Vouchers, or PayPal. Delivery timeframes typically range from 1 to 24 hours.
          </p>
        </div>
      )}

      {/* TAB 4: Privacy */}
      {activeTab === 'privacy' && (
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-500 shadow-xs space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Privacy Policy & Data Security
          </h2>
          <p>
            1. Data Confidentiality: All research survey responses are anonymized and aggregated prior to sharing with research partners.
          </p>
          <p>
            2. Payment Information: Payment details (such as UPI IDs or PayPal emails) are used exclusively for transmitting authorized withdrawal funds and are encrypted end-to-end.
          </p>
          <p>
            3. No Spam Guarantee: We will never sell your personal contact email address to third-party advertisers.
          </p>
        </div>
      )}
    </div>
  );
};
