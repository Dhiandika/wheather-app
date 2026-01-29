
import React from 'react';
import { Region } from '../types';

interface DetailPanelProps {
  region: Region;
  aiAnalysis: string;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ region, aiAnalysis }) => {
  return (
    <div className="flex-1 flex flex-col gap-6 pointer-events-auto overflow-y-auto no-scrollbar pb-10">
      {/* Sector Overview Card */}
      <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 shadow-2xl relative overflow-hidden bg-[#0a141e]/70">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <span className="material-symbols-outlined text-8xl text-primary">radar</span>
        </div>
        
        <div className="flex flex-col gap-1 mb-8">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em]">Command Sector</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">{region.name}</h2>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-start">
              <span className="text-8xl font-black text-white tracking-tighter leading-none neon-text-glow">{region.data.temp}</span>
              <span className="text-2xl font-black text-primary mt-2">°</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
               <span className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(19,146,236,1)]"></span>
               <span className="text-[11px] font-black text-white/50 uppercase tracking-[0.4em]">{region.data.condition}</span>
            </div>
          </div>
          <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 rotate-3">
             <span className="material-symbols-outlined text-2xl text-primary/60">analytics</span>
          </div>
        </div>
      </div>

      {/* Neural Intelligence Analysis Card */}
      <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 shadow-2xl relative overflow-hidden flex-1 flex flex-col bg-[#0a141e]/70">
        <div className="absolute top-6 right-8 flex items-center gap-2">
           <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest">AI_ANALYSIS_NODE</span>
           <span className="material-symbols-outlined text-primary/30 text-xl">neurology</span>
        </div>
        
        <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-10">Neural Intelligence Insights</h3>
        
        <div className="flex-1 flex flex-col justify-center gap-10 relative">
          <div className="relative">
            <span className="text-6xl text-primary/10 font-serif absolute -top-8 -left-6 select-none leading-none">“</span>
            <p className="text-[15px] font-medium text-white/80 leading-relaxed italic tracking-tight pl-4 border-l-2 border-primary/20">
              {aiAnalysis}
            </p>
          </div>
          
          <div className="space-y-5">
            <div className="flex justify-between items-center text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">
              <span className="flex items-center gap-2"><span className="size-1 rounded-full bg-primary/40"></span> Processing Efficiency</span>
              <span className="text-primary font-mono tracking-normal">99.8% STABLE</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary shadow-[0_0_15px_rgba(19,146,236,0.6)] transition-all duration-1000" style={{width: '94%'}}></div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="size-5 rounded-full bg-primary/20 border border-white/10 flex items-center justify-center"><span className="text-[7px]">01</span></div>
              <div className="size-5 rounded-full bg-primary/20 border border-white/10 flex items-center justify-center"><span className="text-[7px]">02</span></div>
            </div>
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Multi-Source Sync</span>
          </div>
          <span className="font-mono text-[9px] text-white/10 uppercase bg-white/5 px-2 py-0.5 rounded">v2.9.2-ALPHA</span>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
