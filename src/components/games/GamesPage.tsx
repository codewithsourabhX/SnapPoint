import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Sparkles, Coins, Trophy, RotateCw, Gift } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GamesPage: React.FC = () => {
  const { addPoints, triggerConfetti, addToast } = useApp();

  // Spin Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [lastWheelWin, setLastWheelWin] = useState<number | null>(null);

  // Scratch Card State
  const [isScratched, setIsScratched] = useState(false);
  const [scratchReward, setScratchReward] = useState<number>(250);

  const wheelPrizes = [100, 250, 50, 500, 150, 300, 75, 1000];

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLastWheelWin(null);

    // Pick random index
    const prizeIndex = Math.floor(Math.random() * wheelPrizes.length);
    const prize = wheelPrizes[prizeIndex];

    const extraRotations = 360 * 5;
    const segmentAngle = 360 / wheelPrizes.length;
    const targetAngle = wheelAngle + extraRotations + (prizeIndex * segmentAngle) + (segmentAngle / 2);

    setWheelAngle(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setLastWheelWin(prize);
      addPoints(prize, `Spin & Win Prize`, 'game');
      triggerConfetti();
    }, 3500);
  };

  const handleScratch = () => {
    if (isScratched) return;
    setIsScratched(true);
    addPoints(scratchReward, `Daily Scratch Card Prize`, 'game');
    triggerConfetti();
  };

  const resetScratch = () => {
    setIsScratched(false);
    const rewardsList = [200, 350, 500, 150, 800];
    const newRew = rewardsList[Math.floor(Math.random() * rewardsList.length)];
    setScratchReward(newRew);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 border-l-4 border-l-amber-500 text-white shadow-xs">
        <div className="max-w-2xl">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            Mini Games & Rewards
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
            Play Games & Earn Bonus
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Test your luck on the Spin Wheel or scratch the daily reward card to win free points every single day!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Game 1: Spin the Wheel */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-xs flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Fortune Wheel Spin
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Spin the wheel once a day for instant prize payouts up to 1,000 Points!
          </p>

          {/* Wheel Graphic */}
          <div className="relative w-64 h-64 flex items-center justify-center my-4">
            {/* Pointer */}
            <div className="absolute -top-3 z-20 w-6 h-6 bg-rose-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-white mt-1" />
            </div>

            {/* Rotating Circle */}
            <motion.div
              animate={{ rotate: wheelAngle }}
              transition={{ duration: 3.5, ease: [0.15, 0.85, 0.35, 1.0] }}
              className="w-full h-full rounded-full border-4 border-amber-500/40 relative overflow-hidden shadow-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500"
            >
              {wheelPrizes.map((p, idx) => {
                const angle = idx * (360 / wheelPrizes.length);
                return (
                  <div
                    key={idx}
                    className="absolute inset-0 flex items-start justify-center pt-3 text-white font-extrabold text-xs"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <span>{p} Pts</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Wheel Win Message */}
          {lastWheelWin && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              🎉 You won +{lastWheelWin} Points!
            </div>
          )}

          <button
            disabled={isSpinning}
            onClick={handleSpinWheel}
            className={`w-full py-3 rounded-lg font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-2 ${
              isSpinning
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Spinning Wheel...' : 'Spin Wheel Now'}</span>
          </button>
        </div>

        {/* Game 2: Scratch Card */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-500 shadow-xs flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Daily Lucky Scratch Card
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click to scratch and reveal today's mystery bonus points reward!
          </p>

          {/* Scratch Box */}
          <div
            onClick={handleScratch}
            className="w-full max-w-xs h-48 rounded-xl border-2 border-dashed border-indigo-500/30 flex items-center justify-center p-6 cursor-pointer relative overflow-hidden transition-all hover:scale-[1.02]"
          >
            {!isScratched ? (
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center text-white p-4">
                <Sparkles className="w-10 h-10 mb-2 animate-bounce" />
                <p className="font-bold text-sm">Tap Here to Scratch!</p>
                <p className="text-[11px] opacity-80 mt-1">Guaranteed Surprise Payout</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <Trophy className="w-10 h-10 text-amber-500" />
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  +{scratchReward} Points!
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  Added to your wallet balance
                </p>
              </div>
            )}
          </div>

          {isScratched && (
            <button
              onClick={resetScratch}
              className="py-2 px-5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Get Next Scratch Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
