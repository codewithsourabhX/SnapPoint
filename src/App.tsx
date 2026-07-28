import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { CheckCircle2, X, Clock } from 'lucide-react';

// Pages
import { LandingPage } from './components/landing/LandingPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { SurveysPage } from './components/surveys/SurveysPage';
import { ReferralsPage } from './components/referral/ReferralsPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { HelpCenterPage } from './components/help/HelpCenterPage';
import { TermsPage } from './components/help/TermsPage';
import { PrivacyPage } from './components/help/PrivacyPage';
import { AdminPage } from './components/admin/AdminPage';
import { WithdrawPage } from './components/withdraw/WithdrawPage';
import { VerifyEmailPage } from './components/auth/VerifyEmailPage';

const AppContent: React.FC = () => {
  const { currentPage, activeModal, closeModal, setCurrentPage, unverifiedEmail, reloadAndCheckVerification } = useApp();

  if (unverifiedEmail) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <VerifyEmailPage
            email={unverifiedEmail}
            onVerified={reloadAndCheckVerification}
          />
        </main>
        <Footer />
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
      case 'dashboard':
        return <DashboardPage />;
      case 'surveys':
        return <SurveysPage />;
      case 'referrals':
        return <ReferralsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'notifications':
        return <NotificationsPage />;
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
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Layout */}
      {isPublicPage ? (
        <main className="flex-1">
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
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto flex">
          {/* Dashboard Sidebar */}
          <Sidebar />

          {/* Page Content View */}
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8 min-w-0 pb-20 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Payout Confirmation Modal */}
      {activeModal?.type === 'payout-success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
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
              Congratulations, your time pays off! 🎉
            </h3>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              Your request for <span className="text-amber-500 font-bold">₹{activeModal.payload?.amountRupees}</span> via{' '}
              <span className="font-bold">{activeModal.payload?.method}</span> ({activeModal.payload?.accountDetail}) has been submitted successfully!
            </p>

            <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-slate-800 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>You will receive your reward in the next 48 hours.</span>
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

      {/* Footer */}
      <Footer />

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
};

