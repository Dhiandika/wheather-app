
import React from 'react';

const MoonPhaseCard: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-[1.5rem] border-white/5 flex items-center gap-6 min-w-[240px]">
      <div className="relative size-16 flex items-center justify-center">
        {/* Simple CSS Moon Phase (Waxing Gibbous) */}
        <div className="absolute inset-0 bg-white/5 rounded-full"></div>
        <div className="absolute inset-0 bg-white/10 rounded-full scale-90 blur-[1px]"></div>
        <div className="absolute inset-0 bg-white/80 rounded-full overflow-hidden mask-moon">
          <div className="absolute inset-0 bg-black/90 rounded-full translate-x-[-30%]"></div>
        </div>
        {/* Craters details could be added with pseudo elements or images */}
      </div>
      <div>
        <span className="text-primary text-[7px] font-black uppercase tracking-[0.3em]">Current Phase</span>
        <h4 className="text-lg font-black text-white tracking-tight uppercase mt-1">Waxing Gibbous</h4>
        <div className="flex flex-col gap-0.5 mt-2">
          <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Illumination: 84.3%</span>
          <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Age: 11.2 days</span>
        </div>
      </div>
      <style>{`
        .mask-moon {
          clip-path: circle(50% at 50% 50%);
        }
      `}</style>
    </div>
  );
};

export default MoonPhaseCard;
