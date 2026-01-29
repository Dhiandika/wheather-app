
import React, { useState, useEffect } from 'react';
import { Region } from '../types';
import { MOCK_REGIONS } from '../constants';
import { searchLocations, LocationData } from '../services/weatherService';

interface SidebarProps {
  currentRegion: Region;
  onLocationSelect: (loc: LocationData) => void;
  activeLayer: string;
  onLayerChange: (layer: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRegion, onLocationSelect, activeLayer, onLayerChange }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<LocationData[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length > 2) {
        const data = await searchLocations(search);
        setResults(data);
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <aside className="flex-1 flex flex-col gap-6 pointer-events-auto overflow-hidden">
      {/* Orbital Access Module */}
      <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 shadow-xl bg-[#0a141e]/70">
        <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">satellite_alt</span>
          Orbital Access
        </h3>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/20 group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] text-white focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/10 uppercase font-black tracking-widest bg-[#050a14]/40" 
            placeholder="Search Global Data Node..." 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {results.length > 0 && (
          <div className="mt-4 space-y-1 max-h-48 overflow-y-auto no-scrollbar glass-panel rounded-xl p-2 border-white/5">
            {results.map((loc) => (
              <div 
                key={loc.id}
                onClick={() => {
                  onLocationSelect(loc);
                  setSearch("");
                  setResults([]);
                }}
                className="p-3 rounded-lg hover:bg-primary/10 text-[9px] font-black text-white/40 hover:text-white transition-all uppercase tracking-widest cursor-pointer flex justify-between items-center"
              >
                <span>{loc.name}, {loc.country}</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sector Nodes Module */}
      <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 shadow-xl flex-1 flex flex-col min-h-0 bg-[#0a141e]/70">
        <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">hub</span>
          Sector Nodes
        </h3>
        <div className="space-y-3 overflow-y-auto pr-2 no-scrollbar flex-1">
          {MOCK_REGIONS.map((region) => {
            const isActive = currentRegion.name === region.name;
            return (
              <div 
                key={region.id}
                onClick={() => onLocationSelect({ 
                  id: Math.random(), 
                  name: region.name, 
                  latitude: -8.67, longitude: 115.21, country: 'ID'
                })}
                className={`p-5 rounded-2xl cursor-pointer transition-all border group relative overflow-hidden ${isActive ? 'bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(19,146,236,0.1)]' : 'bg-white/5 border-transparent hover:border-white/5'}`}
              >
                {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_10px_rgba(19,146,236,1)]"></div>}
                <div className="flex justify-between items-center">
                  <span className={`text-[11px] font-black tracking-[0.2em] uppercase transition-colors ${isActive ? 'text-white' : 'text-white/20 group-hover:text-white/40'}`}>
                    {region.name}
                  </span>
                  <div className={`flex items-center gap-3`}>
                    <span className="text-[8px] font-mono text-white/10 uppercase hidden group-hover:block">Node_0{Math.floor(Math.random()*9)}</span>
                    <span className={`size-2 rounded-full transition-all ${isActive ? 'bg-primary shadow-[0_0_10px_rgba(19,146,236,1)]' : 'bg-white/10'}`}></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
           <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Network Health</span>
           <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-1 w-3 rounded-full ${i < 4 ? 'bg-primary/40' : 'bg-white/10'}`}></div>
              ))}
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
