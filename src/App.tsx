import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { CheckCircle2, X, Clock } from 'lucide-react';

// Pages
import { LandingPage } from './components/landing/LandingPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { LoginPage } from './components/auth/LoginPage';
import { SurveysPage } from './components/surveys/SurveysPage';
import { GamesPage } from './components/games/GamesPage';
import { TasksPage } from './components/tasks/TasksPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { HelpCenterPage } from './components/help/HelpCenterPage';
import { TermsPage } from './components/help/TermsPage';
import { PrivacyPage } from './components/help/PrivacyPage';
import { AdminPage } from './components/admin/AdminPage';
import { WithdrawPage } from './components/withdraw/WithdrawPage';
import { VerifyEmailPage } from './components/auth/VerifyEmailPage';

const AppContent: React.FC = () => {
  const { currentPage, activeModal, closeModal, setCurrentPage, unverifiedEmail, reloadAndCheckVerification, user } = useApp();

  if (unverifiedEmail) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased">
        <header className="bg-slate-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-900 sticky top-0 z-40 select-none">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight">PollBee</span>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <VerifyEmailPage
            email={unverifiedEmail}
            onVerified={reloadAndCheckVerification}
          />
        </main>
        <ToastContainer />
      </div>
    );
  }

  const isPublicPage =
    currentPage === 'landing' ||
    currentPage === 'signup' ||
    currentPage === 'login';

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'signup':
        return <SignUpPage />;
      case 'login':
        return <LoginPage />;
      case 'surveys':
        return <SurveysPage />;
      case 'games':
        return <GamesPage />;
      case 'tasks':
        return <TasksPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPage />;
      case 'withdraw':
        return <WithdrawPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'help':
        return <HelpCenterPage />;
      default:
        return <SurveysPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased">
      {/* Dark Top Header (Authenticated users only) */}
      {!isPublicPage && (
        <header className="bg-slate-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-900 sticky top-0 z-40 select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black text-sm">
              B
            </div>
            <span className="font-extrabold text-sm tracking-tight">PollBee</span>
          </div>
          
          <div className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-sm shadow-rose-600/20 active:scale-95 transition-all">
            <span>{(user.points || 0).toLocaleString()} gp</span>
            <span className="opacity-70">≈</span>
            <span>INR {(user.balanceInRupees || 0).toLocaleString()}</span>
          </div>
        </header>
      )}

      {/* Main View Layout */}
      <main className="flex-1 pb-20 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Payout Confirmation Modal */}
      {activeModal?.type === 'payout-success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-extrabold text-amber-500 dark:text-amber-400">
              Request Submitted! 🎉
            </h3>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              Your withdrawal request for <span className="text-amber-500 font-bold">₹{activeModal.payload?.amountRupees}</span> has been submitted successfully!
            </p>

            <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-slate-800 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Your request is submitted and you will get your reward in the next 48 hours.</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  closeModal();
                  setCurrentPage('surveys');
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                Back to Surveys
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Stack */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

