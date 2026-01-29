
import React from 'react';
import { ForecastDay } from '../types';

interface ForecastProps {
  days: ForecastDay[];
  onDaySelect?: (day: ForecastDay) => void;
  selectedDayCondition?: string;
}

const Forecast: React.FC<ForecastProps> = ({ days, onDaySelect, selectedDayCondition }) => {
  return (
    <div className="glass-panel rounded-[2rem] p-1.5 flex gap-2 border-white/5 shadow-2xl backdrop-blur-3xl overflow-hidden pointer-events-auto bg-[#0a141e]/60">
      {days.slice(0, 5).map((item, idx) => {
        const isActive = selectedDayCondition ? item.condition === selectedDayCondition : idx === 0;
        
        return (
          <div 
            key={idx}
            onClick={() => onDaySelect?.(item)}
            className={`min-w-[100px] p-5 rounded-[1.5rem] transition-all cursor-pointer flex flex-col items-center gap-3 group border ${
              isActive 
                ? 'bg-primary/10 border-primary/40 shadow-[inset_0_0_20px_rgba(19,146,236,0.1)]' 
                : 'bg-white/5 border-transparent hover:border-white/10'
            }`}
          >
            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-primary' : 'text-white/30'}`}>
              {item.day}
            </span>
            <span className={`material-symbols-outlined text-2xl transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-white/40'}`}>
              {item.icon}
            </span>
            <div className="text-center">
              <div className="text-xl font-black text-white tracking-tighter">{item.tempHigh}°</div>
              <div className="text-[9px] font-bold text-white/20 uppercase mt-0.5">{item.tempLow}°</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
