import React from 'react';
import { motion } from 'motion/react';
import { CheckSquare, Sparkles } from 'lucide-react';

export const TasksPage: React.FC = () => {
  return (
    <div className="p-6 bg-slate-950 min-h-[calc(100vh-4rem)] flex items-center justify-center text-slate-200 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-w-md w-full text-center p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/10">
          <CheckSquare className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-extrabold uppercase tracking-widest inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Daily Offers & Tasks
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight pt-2">
            Coming Soon.....
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Get ready for simple app testing, daily check-in tasks, and promotional offers to boost your SnapPoints earnings!
          </p>
        </div>
      </motion.div>
    </div>
  );
};
