import React from 'react';
import {
  ClipboardList,
  Gamepad2,
  CheckSquare,
  Gift,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();

  const isPublicPage =
    currentPage === 'landing' ||
    currentPage === 'signup' ||
    currentPage === 'login';

  if (isPublicPage) return null;

  const navItems = [
    { id: 'surveys' as PageView, label: 'Surveys', icon: ClipboardList },
    { id: 'games' as PageView, label: 'Games', icon: Gamepad2 },
    { id: 'tasks' as PageView, label: 'Tasks', icon: CheckSquare },
    { id: 'withdraw' as PageView, label: 'Rewards', icon: Gift },
    { id: 'profile' as PageView, label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 shadow-lg transition-colors">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center justify-center min-w-[60px] py-1 px-2 rounded-xl transition-all active:scale-95 ${
                isActive
                  ? 'text-rose-600 dark:text-rose-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-rose-500/10 text-rose-500' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

