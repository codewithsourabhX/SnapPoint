import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coins, Clock, CheckCircle2, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Survey } from '../../types';
import { useApp } from '../../context/AppContext';

interface SurveyModalProps {
  survey: Survey;
  onClose: () => void;
}

export const SurveyModal: React.FC<SurveyModalProps> = ({ survey, onClose }) => {
  const { completeSurvey } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = survey.questions && survey.questions.length > 0 ? survey.questions : [
    {
      id: 1,
      question: 'How frequently do you use online services or mobile apps for daily tasks?',
      options: ['Multiple times daily', 'Once a day', 'A few times a week', 'Rarely']
    },
    {
      id: 2,
      question: 'What is your primary factor when rating service quality?',
      options: ['Speed & Efficiency', 'Ease of Use', 'Customer Support', 'Cost & Value']
    }
  ];

  const handleSelectOption = (questionId: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsCompleted(true);
        completeSurvey(survey.id, survey.points);
      }, 1200);
    }
  };

  const activeQuestion = questions[currentStep];
  const isAnswered = selectedAnswers[activeQuestion.id] !== undefined;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
            {survey.category}
          </span>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
            {survey.title}
          </h3>
          <p className="text-xs text-neutral-400">Provider: {survey.provider}</p>
        </div>

        <div className="text-right">
          <div className="text-base font-extrabold text-amber-500 flex items-center justify-end gap-1">
            <Coins className="w-4 h-4" />
            <span>+{survey.points} Pts</span>
          </div>
          <span className="text-xs text-emerald-500 font-semibold">₹{survey.points / 10} Reward</span>
        </div>
      </div>

      {!isCompleted ? (
        <>
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-neutral-400 font-medium">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="space-y-4 py-2">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-relaxed">
              {activeQuestion.question}
            </h4>

            <div className="space-y-2.5">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[activeQuestion.id] === option;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(activeQuestion.id, option)}
                    className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                        : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700/80 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{option}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-white bg-white' : 'border-neutral-400'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
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
              Cancel Survey
            </button>

            <button
              disabled={!isAnswered || isSubmitting}
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                isAnswered && !isSubmitting
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 active:scale-95'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span>Submitting Answers...</span>
              ) : (
                <>
                  <span>{currentStep === questions.length - 1 ? 'Finish & Claim Reward' : 'Next Question'}</span>
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
            Survey Completed! 🎉
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            Thank you for providing valuable feedback. Points have been credited immediately to your EarnPulse account!
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-extrabold text-lg">
            <Coins className="w-5 h-5" />
            <span>+{survey.points} Points Added!</span>
          </div>

          <div className="pt-4">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
            >
              Done & Return to Surveys
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
