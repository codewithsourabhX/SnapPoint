import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrivacyPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('surveys')}
          className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Surveys
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-3 border-b border-amber-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Privacy Policy & Governance
            </h1>
             <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              SnapPoint • Delhi, India (https://www.snappoint.online/policy)
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-2">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              Privacy Notice & Data Processing
            </h2>
            <p>
              When processing your personal information, SnapPoint ("Provider", located in Delhi, India) complies with applicable privacy and data protection legislation. Information on how Provider uses and processes information submitted in connection with our Services is incorporated into these terms and available at <a href="https://www.snappoint.online/policy" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">https://www.snappoint.online/policy</a>.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              Information We Collect & Verification
            </h2>
            <p>
              To participate in Tasks (such as online surveys, product tests, app tests, and website tests) and receive remuneration, Members may provide additional details about themselves, including identity verification via scans or photos of official identification documents to confirm identity and prevent fraud.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name & Contact Email Address</li>
              <li>Single Sign-On (SSO) login details if utilized</li>
              <li>Verification details for payouts (biometric data/identity confirmation when required)</li>
              <li>Payout account details (UPI ID, Bank Account/IFSC, or PayPal email)</li>
              <li>Task participation evidence & activity logs</li>
            </ul>
          </section>

          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              Fraud Prevention & Biometric Verification
            </h2>
            <p>
              For fraud prevention purposes (in particular to prevent the use of bots and spam software), Provider may require you to complete an identity/existence verification procedure before making any payout. The Verification Procedure may involve the collection and processing of biometric data in accordance with applicable data protection legislation.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              Notices & Account Management
            </h2>
            <p>
              All communications will be sent to the email address associated with your Account. You may deactivate or delete your Account at any time. Inactive Accounts (with no login for more than 12 months) may be removed following advance notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
