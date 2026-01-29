
import React, { useState, useEffect } from 'react';
import { searchLocations, LocationData } from '../services/weatherService';

interface HeaderProps {
  currentRegion: any;
  onLocationSelect: (loc: LocationData) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRegion, onLocationSelect }) => {
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
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-10 py-6 flex justify-between items-center pointer-events-none bg-gradient-to-b from-[#050a14] to-transparent">
      {/* Brand Left */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="size-10 bg-primary/20 border border-primary/40 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(19,146,236,0.1)]">
          <span className="material-symbols-outlined text-primary text-2xl">grid_view</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-[12px] font-black tracking-[0.3em] uppercase leading-tight">AeroWeather Tactical</h1>
          <p className="text-[8px] text-white/30 uppercase font-black tracking-[0.4em]">Global Command Hub</p>
        </div>
      </div>

      {/* Global Command Center Label */}
      <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-black text-white/20 uppercase tracking-[0.5em] hidden md:block">
        AeroWeather Global Command Center
      </div>

      {/* Search Bar Right */}
      <div className="relative pointer-events-auto">
        <div className="glass-panel px-6 py-3 rounded-xl border-white/5 flex items-center gap-3 w-[300px] transition-all bg-[#0a141e]/60 focus-within:border-primary/40 focus-within:bg-[#0a141e]/90">
          <span className="material-symbols-outlined text-primary/60 text-lg">search</span>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={currentRegion.name || "ENTER SECTOR..."}
            className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-[0.2em] text-white placeholder:text-white/20 w-full"
          />
        </div>
        
        {results.length > 0 && (
          <div className="absolute top-full mt-3 w-full glass-panel rounded-xl overflow-hidden border-white/10 z-[110] shadow-2xl bg-[#0a141e]">
            {results.map((loc) => (
              <div 
                key={loc.id}
                onClick={() => {
                  onLocationSelect(loc);
                  setSearch("");
                  setResults([]);
                }}
                className="px-6 py-3 hover:bg-primary/10 cursor-pointer text-[9px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all flex justify-between items-center"
              >
                <span>{loc.name}, {loc.country}</span>
                <span className="material-symbols-outlined text-[10px] text-primary">arrow_outward</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
