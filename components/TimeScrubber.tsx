
import React, { useState } from 'react';

interface TimeScrubberProps {
  onTimeChange: (time: string) => void;
}

const TimeScrubber: React.FC<TimeScrubberProps> = ({ onTimeChange }) => {
  const [val, setVal] = useState(50);

  return (
    <div className="glass-panel px-10 py-4 rounded-full border-white/5 flex flex-col items-center gap-2">
      <div className="flex justify-between w-full text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">
        <span>-24h</span>
        <span className="text-primary tracking-[0.5em] font-black">Global Timestamp: 11:42 AM</span>
        <span>+24h</span>
      </div>
      <div className="relative w-full h-8 flex items-center">
        {/* Timeline track markers */}
        <div className="absolute inset-0 flex justify-between items-center pointer-events-none px-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`h-1.5 w-[1px] bg-white/${i === 4 ? '40' : '10'}`}></div>
          ))}
        </div>
        <input 
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(parseInt(e.target.value))}
          className="w-full appearance-none bg-white/5 h-[1px] rounded-full cursor-pointer outline-none slider-thumb-custom"
        />
      </div>
      <style>{`
        .slider-thumb-custom::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 4px;
          height: 16px;
          background: #1392ec;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(19,146,236,0.8);
          cursor: pointer;
          transition: all 0.2s;
        }
        .slider-thumb-custom::-webkit-slider-thumb:hover {
          height: 20px;
          box-shadow: 0 0 15px rgba(19,146,236,1);
        }
      `}</style>
    </div>
  );
};

export default TimeScrubber;
