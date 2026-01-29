
import React from 'react';
import { Region } from '../types';

interface ObservationPanelProps {
  region: Region;
}

const ObservationPanel: React.FC<ObservationPanelProps> = ({ region }) => {
  return (
    <div className="w-[340px] flex flex-col gap-6 z-50 pointer-events-auto">
      <div className="glass-panel p-6 rounded-[2rem] border-white/5 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Observation Data</h3>
          <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(19,146,236,1)]"></div>
        </div>

        {/* Data Tiles */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest">Sunrise</span>
            <div className="text-sm font-bold text-white mt-1 uppercase tracking-tight">09:12 AM</div>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest">Sunset</span>
            <div className="text-sm font-bold text-white mt-1 uppercase tracking-tight">02:24 PM</div>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest">Moonrise</span>
            <div className="text-sm font-bold text-white mt-1 uppercase tracking-tight">11:45 AM</div>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest">Moonset</span>
            <div className="text-sm font-bold text-white mt-1 uppercase tracking-tight">04:12 PM</div>
          </div>
        </div>

        {/* Lighting Phases */}
        <div className="space-y-6 mb-8">
          <h4 className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Lighting Phases</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest mb-1.5">
                <span className="text-orange-400 flex items-center gap-2"><span className="size-1 rounded-full bg-orange-400"></span> Golden Hour</span>
                <span className="text-white/30">42m left</span>
              </div>
              <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 w-[65%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest mb-1.5">
                <span className="text-primary flex items-center gap-2"><span className="size-1 rounded-full bg-primary"></span> Blue Hour</span>
                <span className="text-white/30">In 2h 14m</span>
              </div>
              <div className="h-0.5 w-full bg-white/5 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Orbital Positioning */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <h4 className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Orbital Positioning</h4>
          <div className="space-y-2 text-[9px] font-bold uppercase tracking-widest">
            <div className="flex justify-between">
              <span className="text-white/30">Earth Distance</span>
              <span className="text-white/80">147.1M km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Solar Declination</span>
              <span className="text-white/80">-14.2°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Obliquity</span>
              <span className="text-white/80">23.44°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationPanel;
