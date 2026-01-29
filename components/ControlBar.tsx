
import React from 'react';

interface ControlBarProps {
  activeLayer: string;
}

const ControlBar: React.FC<ControlBarProps> = ({ activeLayer }) => {
  return (
    <div className="flex flex-col gap-2 z-50 pointer-events-auto">
      <div className="glass-panel rounded-2xl flex flex-col p-2 border-white/5">
        <button className="size-12 rounded-xl flex items-center justify-center text-primary bg-primary/10 hover:bg-primary/20 transition-all">
          <span className="material-symbols-outlined">public</span>
        </button>
        <button className="size-12 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="size-12 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
        <div className="h-[1px] bg-white/5 my-2 mx-3"></div>
        <button className="size-12 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all">
          <span className="material-symbols-outlined">add</span>
        </button>
        <button className="size-12 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all">
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
