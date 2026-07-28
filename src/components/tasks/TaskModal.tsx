import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Coins, Clock, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
import { TaskItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface TaskModalProps {
  task: TaskItem;
  onClose: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const { completeTask } = useApp();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(prev => prev.filter(i => i !== index));
    } else {
      setCompletedSteps(prev => [...prev, index]);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsFinished(true);
      completeTask(task.id, task.rewardPoints);
    }, 1500);
  };

  const allStepsDone = completedSteps.length === task.requirements.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold">
            {task.category}
          </span>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
            {task.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{task.estimatedMinutes} Mins Estimated</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-base font-extrabold text-amber-500 flex items-center justify-end gap-1">
            <Coins className="w-4 h-4" />
            <span>+{task.rewardPoints} Pts</span>
          </div>
          <span className="text-xs text-emerald-500 font-semibold">₹{task.rewardPoints / 10}</span>
        </div>
      </div>

      {!isFinished ? (
        <>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {task.description}
          </p>

          {/* Action Link Button */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Sponsor Link Ready</span>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://google.com', '_blank');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>Open Offer Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Required Steps (Check off as you complete):
            </h4>

            <div className="space-y-2">
              {task.requirements.map((req, idx) => {
                const checked = completedSteps.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`w-full p-3 rounded-2xl text-left text-xs font-medium transition-all border flex items-center justify-between ${
                      checked
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <span>{req}</span>
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                        checked
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-neutral-400'
                      }`}
                    >
                      {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Close
            </button>

            <button
              disabled={!allStepsDone || isVerifying}
              onClick={handleVerify}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                allStepsDone && !isVerifying
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 active:scale-95'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <span>Verifying Task Completion...</span>
              ) : (
                <>
                  <span>Verify & Claim Payout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        /* Completion View */
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
            Task Verified! 🎉
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            Your task verification succeeded. Reward points have been added to your wallet!
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-extrabold text-lg">
            <Coins className="w-5 h-5" />
            <span>+{task.rewardPoints} Points Credited!</span>
          </div>

          <div className="pt-4">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
            >
              Done & Browse More Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
