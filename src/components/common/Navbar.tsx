import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Bell,
  Coins,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Gift,
  Award,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  ShieldAlert,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    user,
    darkMode,
    toggleDarkMode,
    unreadNotificationsCount,
    signOutUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isPublicPage = currentPage === 'landing' || currentPage === 'login' || currentPage === 'signup';

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/50 dark:border-slate-800 bg-amber-50/90 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => navigateTo(isPublicPage ? 'landing' : 'dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <span className="text-2xl select-none">🐝</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Poll<span className="text-amber-500">Bee</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                REWARDS
              </span>
            </div>
          </div>
        </div>

        {/* Public Desktop Nav Links */}
        {isPublicPage ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <button
              onClick={() => navigateTo('landing')}
              className={`hover:text-amber-500 transition-colors ${
                currentPage === 'landing' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('surveys')}
              className="hover:text-amber-500 transition-colors"
            >
              Surveys
            </button>
            <button
              onClick={() => navigateTo('help')}
              className="hover:text-amber-500 transition-colors"
            >
              Help & FAQ
            </button>
            <button
              onClick={() => navigateTo('terms')}
              className="hover:text-amber-500 transition-colors"
            >
              Terms & Conditions
            </button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            {/* Admin Panel Button */}
            {user.isAdmin && (
              <button
                onClick={() => navigateTo('admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-xs hover:bg-amber-400 transition-all active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* Quick Balance Pill */}
            <div
              onClick={() => navigateTo('withdraw')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all cursor-pointer group"
            >
              <Coins className="w-4 h-4 text-amber-500 group-hover:scale-105 transition-transform" />
              <div className="flex items-baseline gap-1 text-xs">
                <span className="font-extrabold text-amber-600 dark:text-amber-400">
                  {(user.points || 0).toLocaleString()} pts
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  (₹{user.balanceInRupees || Math.floor((user.points || 0) / 10)})
                </span>
              </div>
            </div>

            {/* Quick Action Start Survey */}
            <button
              onClick={() => navigateTo('surveys')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Take Surveys</span>
            </button>
          </div>
        )}

        {/* Right Nav Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* If Logged In: Notifications & Profile */}
          {!isPublicPage ? (
            <>
              {/* Notification Bell */}
              <button
                onClick={() => navigateTo('notifications')}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl border border-amber-200 dark:border-slate-800 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold flex items-center justify-center text-xs ring-2 ring-amber-500/40 shrink-0">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline-block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Menu Popup */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-bold bg-amber-500/10 p-1.5 rounded-lg">
                        <span>PollBee Member</span>
                        <span>{user.points} Pts</span>
                      </div>
                    </div>

                    <div className="py-1 text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                      {user.isAdmin && (
                        <button
                          onClick={() => navigateTo('admin')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-500/30 transition-colors text-left"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-500" />
                          <span>Admin Control Panel</span>
                        </button>
                      )}

                      <button
                        onClick={() => navigateTo('dashboard')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        <span>My Dashboard</span>
                      </button>

                      <button
                        onClick={() => navigateTo('profile')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left font-medium"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>Profile & Account</span>
                      </button>

                      <button
                        onClick={() => navigateTo('referrals')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left font-medium"
                      >
                        <Award className="w-4 h-4 text-slate-400" />
                        <span>Refer & Earn (10%)</span>
                      </button>

                      <button
                        onClick={() => navigateTo('help')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left font-medium"
                      >
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <span>Help Center</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={signOutUser}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors text-left font-bold text-xs"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Public Auth Buttons */
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('login')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigateTo('signup')}
                className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all shadow-xs active:scale-95"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-amber-200 dark:border-slate-800 bg-amber-50/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          {!isPublicPage && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {(user.points || 0).toLocaleString()} Points
                </span>
              </div>
              <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-xl">
                ₹{user.balanceInRupees || Math.floor((user.points || 0) / 10)}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            {isPublicPage ? (
              <>
                <button
                  onClick={() => navigateTo('landing')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-left"
                >
                  Home Page
                </button>
                <button
                  onClick={() => navigateTo('surveys')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-left"
                >
                  Explore Surveys
                </button>
                <button
                  onClick={() => navigateTo('help')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-left"
                >
                  Help Center
                </button>
              </>
            ) : (
              <>
                {user.isAdmin && (
                  <button
                    onClick={() => navigateTo('admin')}
                    className="p-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-left col-span-2 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" /> Admin Control Panel
                  </button>
                )}
                <button
                  onClick={() => navigateTo('surveys')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left"
                >
                  PollBee Surveys
                </button>
                <button
                  onClick={() => navigateTo('withdraw')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left"
                >
                  Withdraw Money
                </button>
                <button
                  onClick={() => navigateTo('referrals')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left"
                >
                  Refer & Earn (10%)
                </button>
                <button
                  onClick={() => navigateTo('profile')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left"
                >
                  My Profile
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

