import React from 'react';

export const FlyingBees: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Flying Bee 1 */}
      <div className="absolute top-[15%] left-[-50px] animate-fly-bee-1 flex items-center gap-1 opacity-90">
        <div className="relative text-2xl drop-shadow-md select-none">
          🐝
        </div>
        <div className="w-12 h-[2px] bg-gradient-to-l from-amber-300/40 to-transparent rounded-full" />
      </div>

      {/* Flying Bee 2 */}
      <div className="absolute top-[40%] right-[-50px] animate-fly-bee-2 flex items-center gap-1 opacity-80">
        <div className="w-16 h-[2px] bg-gradient-to-r from-amber-300/40 to-transparent rounded-full" />
        <div className="relative text-3xl drop-shadow-md select-none transform -scale-x-100">
          🐝
        </div>
      </div>

      {/* Flying Bee 3 */}
      <div className="absolute top-[70%] left-[-60px] animate-fly-bee-3 flex items-center gap-1 opacity-85">
        <div className="relative text-2xl drop-shadow-md select-none">
          🐝
        </div>
        <div className="w-10 h-[2px] bg-gradient-to-l from-amber-300/40 to-transparent rounded-full" />
      </div>

      {/* Floating Honeycomb Honey drops */}
      <div className="absolute top-[25%] right-[10%] text-amber-500/20 text-4xl animate-bounce duration-[3000ms] select-none">
        🍯
      </div>
      <div className="absolute top-[65%] left-[8%] text-yellow-500/20 text-3xl animate-bounce duration-[4000ms] select-none">
        ✨
      </div>
    </div>
  );
};
