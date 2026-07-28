import React, { useState } from 'react';
import {
  Coins,
  Clock,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Globe,
  UserPlus,
  Share2,
  Tv,
  Gift
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TaskItem, TaskCategory } from '../../types';
import { Modal } from '../common/Modal';
import { TaskModal } from './TaskModal';

export const TasksPage: React.FC = () => {
  const { tasks } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);

  const categories: string[] = [
    'All',
    'App installs',
    'Website visits',
    'Signups',
    'Social media',
    'Video watching',
    'Offers'
  ];

  const getCategoryIcon = (category: TaskCategory) => {
    switch (category) {
      case 'App installs': return Smartphone;
      case 'Website visits': return Globe;
      case 'Signups': return UserPlus;
      case 'Social media': return Share2;
      case 'Video watching': return Tv;
      case 'Offers': return Gift;
      default: return Sparkles;
    }
  };

  const filteredTasks = tasks.filter(t => selectedCategory === 'All' || t.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 border-l-4 border-l-purple-500 text-white shadow-xs">
        <div className="max-w-2xl">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
            Quick Micro-Tasks
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
            Tasks & Offers Wall
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Install apps, watch quick videos, follow social channels, or complete free signups to earn fast reward points.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map(task => {
          const Icon = getCategoryIcon(task.category);
          const isCompleted = task.status === 'Completed';

          return (
            <div
              key={task.id}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-purple-500 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {task.category}
                    </span>
                  </div>

                  {task.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold border border-amber-500/20">
                      {task.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {task.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{task.estimatedMinutes} Mins Estimated</span>
                </div>
              </div>

              {/* Bottom Card Row */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold text-amber-500 flex items-center gap-1">
                    <Coins className="w-4 h-4" />
                    <span>+{task.rewardPoints} Pts</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">₹{task.rewardPoints / 10}</span>
                </div>

                {isCompleted ? (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveTask(task)}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-xs active:scale-95"
                  >
                    Start Task
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      {activeTask && (
        <Modal isOpen={!!activeTask} onClose={() => setActiveTask(null)} maxWidth="max-w-md">
          <TaskModal task={activeTask} onClose={() => setActiveTask(null)} />
        </Modal>
      )}
    </div>
  );
};
