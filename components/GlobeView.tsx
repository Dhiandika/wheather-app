
import React, { useMemo } from 'react';

interface TacticalViewProps {
  loading: boolean;
  regionName: string;
  condition?: string;
  temp?: number;
  humidity?: number;
  wind?: number;
  pressure?: number;
}

const TacticalWeatherHub: React.FC<TacticalViewProps> = ({ 
  loading, 
  regionName, 
  condition = "Clear Sky",
  temp = 0
}) => {
  const normalizedCondition = condition.toLowerCase();
  
  const weatherTheme = useMemo(() => {
    if (normalizedCondition.includes('storm')) return { color: '#a855f7', icon: 'thunderstorm', glow: 'rgba(168, 85, 247, 0.5)' };
    if (normalizedCondition.includes('rain')) return { color: '#0ea5e9', icon: 'rainy', glow: 'rgba(14, 165, 233, 0.5)' };
    if (normalizedCondition.includes('snow')) return { color: '#f8fafc', icon: 'ac_unit', glow: 'rgba(248, 250, 252, 0.5)' };
    if (normalizedCondition.includes('cloud')) return { color: '#94a3b8', icon: 'cloud', glow: 'rgba(148, 163, 184, 0.5)' };
    return { color: '#f59e0b', icon: 'wb_sunny', glow: 'rgba(245, 158, 11, 0.5)' };
  }, [normalizedCondition]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      
      {/* 1. ATMOSPHERIC DEPTH PARTICLES */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute size-1 bg-white rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.15,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* 2. CORE HUB STRUCTURE */}
      <div className={`relative w-full max-w-[650px] aspect-square transition-all duration-1000 ${loading ? 'scale-95 blur-2xl opacity-0' : 'scale-100 blur-0 opacity-100'}`}>
        
        {/* Holographic Concentric Rings */}
        <div className="absolute inset-0 rounded-full border border-white/5 shadow-[inset_0_0_100px_rgba(19,146,236,0.02)]"></div>
        <div className="absolute inset-16 rounded-full border border-primary/5 animate-spin-slow"></div>
        <div className="absolute inset-24 rounded-full border border-white/5"></div>
        
        {/* Sector Name Ghost Text (Refined for legibility) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] overflow-hidden">
          <span className="text-[200px] font-black tracking-[-0.05em] uppercase leading-none select-none">
            {regionName}
          </span>
        </div>

        {/* Central Information Stack */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            
            {/* Condition Icon Projection */}
            <div className="mb-6 relative">
                <span className="material-symbols-outlined text-[90px] transition-all duration-1000" 
                      style={{ color: weatherTheme.color, textShadow: `0 0 50px ${weatherTheme.glow}` }}>
                    {weatherTheme.icon}
                </span>
                <div className="absolute inset-0 blur-[60px] opacity-10 bg-current rounded-full" style={{ color: weatherTheme.color }}></div>
            </div>

            {/* Strategic Labels */}
            <div className="text-center z-10 space-y-1">
                <span className="text-[9px] font-black text-primary/40 uppercase tracking-[0.8em] block mb-2">Atmospheric_Link_Active</span>
                <h2 className="text-6xl font-black tracking-tighter text-white uppercase leading-none">{regionName}</h2>
                
                <div className="flex items-center justify-center gap-4 py-4 opacity-40">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white"></div>
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">{condition}</span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white"></div>
                </div>
            </div>

            {/* High-Resolution Temperature Display */}
            <div className="mt-4 flex flex-col items-center">
                <div className="flex items-start">
                  <span className="text-9xl font-black text-white tracking-tighter leading-none neon-text-glow">{temp}</span>
                  <span className="text-4xl font-black text-primary ml-1 mt-4">°</span>
                </div>
            </div>
        </div>

        {/* Radial Scanning Accents */}
        <div className="absolute inset-[-20px] pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse"></div>
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-pulse"></div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-particle {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.15; }
          80% { opacity: 0.15; }
          100% { transform: translate(50px, -150px); opacity: 0; }
        }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
        .animate-float-particle { animation: float-particle linear infinite; }
        .neon-text-glow {
            text-shadow: 0 0 20px rgba(19,146,236,0.4);
        }
      `}</style>
    </div>
  );
};

export default TacticalWeatherHub;
