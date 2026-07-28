import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Gift,
  Calendar,
  Users,
  Bell,
  User,
  HelpCircle,
  LogOut,
  Sparkles,
  ShieldCheck,
  FileText,
  Wallet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, unreadNotificationsCount, user, signOutUser } = useApp();

  const navItems = [
    { id: 'surveys' as PageView, label: 'Surveys', icon: ClipboardList, badge: 'High Payout' },
    { id: 'withdraw' as PageView, label: 'Withdraw Money', icon: Wallet, highlight: true },
    { id: 'referrals' as PageView, label: 'Refer & Earn (10%)', icon: Users },
    {
      id: 'notifications' as PageView,
      label: 'Notifications',
      icon: Bell,
      count: unreadNotificationsCount
    },
    { id: 'profile' as PageView, label: 'My Profile', icon: User },
    { id: 'help' as PageView, label: 'Help & FAQ', icon: HelpCircle },
    { id: 'terms' as PageView, label: 'Terms & Policy', icon: FileText }
  ];

  if (user.isAdmin) {
    navItems.unshift({
      id: 'admin' as PageView,
      label: 'Admin Control Panel',
      icon: ShieldCheck,
      badge: 'Admin'
    });
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-amber-200/40 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[calc(100vh-4rem)] p-4 space-y-6">
      {/* Navigation List */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Navigation
        </p>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-amber-500/10 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border-l-4 border-amber-500 rounded-r-xl rounded-l-none pl-3 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-amber-50 dark:hover:bg-slate-800/50 rounded-xl'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                    isActive ? 'text-amber-500' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {/* Badges or Unread Count */}
              {item.count !== undefined && item.count > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {item.count}
                </span>
              )}

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.badge === 'Admin'
                      ? 'bg-amber-500 text-slate-950'
                      : isActive
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout button at bottom */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={signOutUser}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

