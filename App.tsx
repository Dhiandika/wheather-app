
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Forecast from './components/Forecast';
import DetailPanel from './components/DetailPanel';
import GlobeView from './components/GlobeView';
import { Region, AppState, ForecastDay } from './types';
import { MOCK_REGIONS, MOCK_FORECAST } from './constants';
import { getClimateAnalysis } from './services/geminiService';
import { fetchWeatherData, LocationData } from './services/weatherService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentRegion: MOCK_REGIONS[0],
    forecast: MOCK_FORECAST,
    activeLayer: 'temperature',
    isSearching: false,
  });

  const [previewCondition, setPreviewCondition] = useState<string | undefined>(undefined);
  const [aiInsight, setAiInsight] = useState<string>("Analyzing atmospheric boundary layer moisture...");
  const [loading, setLoading] = useState(false);
  const [isUiVisible, setIsUiVisible] = useState(true);

  const updateWeatherForLocation = useCallback(async (name: string, lat: number, lon: number) => {
    setLoading(true);
    setPreviewCondition(undefined);
    try {
      const weather = await fetchWeatherData(lat, lon);
      
      const newRegion: Region = {
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name.toUpperCase(),
        data: {
          temp: weather.current.temp,
          condition: weather.current.condition,
          pressure: weather.current.pressure,
          humidity: weather.current.humidity,
          windSpeed: weather.current.windSpeed,
          uvIndex: weather.extra.uvIndex,
          visibility: 10,
          solarIrrad: Math.round(800 + Math.random() * 200),
          vaporDensity: Math.round(weather.current.humidity * 0.15 * 10) / 10
        }
      };

      setState(prev => ({
        ...prev,
        currentRegion: newRegion,
        forecast: weather.forecast
      }));

      const analysis = await getClimateAnalysis(newRegion.name, newRegion.data);
      setAiInsight(analysis);
    } catch (err) {
      console.error("Failed to sync weather data", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateWeatherForLocation('Denpasar', -8.6705, 115.2126);
  }, []);

  const handleLocationSelect = (loc: LocationData) => {
    updateWeatherForLocation(loc.name, loc.latitude, loc.longitude);
  };

  const handleForecastClick = (day: ForecastDay) => {
    setPreviewCondition(day.condition);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050a14] text-white selection:bg-primary/30 font-display">
      {/* Dynamic Background Noise/Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(19,146,236,0.04)_0%,transparent_70%)]"></div>
      </div>

      <Header currentRegion={state.currentRegion} onLocationSelect={handleLocationSelect} />

      <main className="relative h-full w-full flex flex-col lg:flex-row p-6 pt-28 pb-14 box-border gap-6 overflow-hidden">
        
        {/* Left Section: 25% Ratio */}
        <div className={`w-full lg:w-[380px] flex flex-col transition-all duration-700 ease-in-out ${isUiVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}>
          <Sidebar 
            currentRegion={state.currentRegion} 
            onLocationSelect={handleLocationSelect}
            activeLayer={state.activeLayer}
            onLayerChange={(l) => setState(s => ({...s, activeLayer: l}))}
          />
        </div>

        {/* Center Section: 50% Ratio (Main Visualization) */}
        <div className="flex-1 relative flex flex-col items-center justify-center min-h-0">
          <div className="scale-[1.1]">
            <GlobeView 
              loading={loading}
              regionName={state.currentRegion.name}
              condition={previewCondition || state.currentRegion.data.condition}
              temp={state.currentRegion.data.temp}
              humidity={state.currentRegion.data.humidity}
              wind={state.currentRegion.data.windSpeed}
              pressure={state.currentRegion.data.pressure}
            />
          </div>
          
          {/* Right Floating Controls */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
             <button 
                onClick={() => setIsUiVisible(!isUiVisible)}
                className="size-10 rounded-xl glass-panel flex items-center justify-center text-white/40 hover:text-white transition-all bg-[#0a141e]/80"
              >
                <span className="material-symbols-outlined text-xl">{isUiVisible ? 'visibility_off' : 'visibility'}</span>
             </button>
             <button 
               onClick={() => setPreviewCondition(undefined)}
               className="size-10 rounded-xl glass-panel flex items-center justify-center text-white/40 hover:text-white transition-all bg-[#0a141e]/80"
             >
               <span className="material-symbols-outlined text-xl">refresh</span>
             </button>
          </div>

          {/* Forecast Ribbon centered at bottom */}
          <div className={`absolute bottom-4 w-full flex justify-center transition-all duration-700 ${isUiVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
            <Forecast 
              days={state.forecast} 
              onDaySelect={handleForecastClick} 
              selectedDayCondition={previewCondition} 
            />
          </div>
        </div>

        {/* Right Section: 25% Ratio */}
        <div className={`w-full lg:w-[420px] flex flex-col transition-all duration-700 ease-in-out ${isUiVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <DetailPanel region={state.currentRegion} aiAnalysis={aiInsight} />
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 w-full h-10 flex items-center justify-between px-10 glass-panel border-t border-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-white/20 z-[100] bg-[#050a14]/95">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2 text-green-500/60"><span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span> SYSTEM_UPLINK: ACTIVE</span>
          <span className="hidden xl:block">CRYPTO_DATA_STREAM: ENCRYPTED</span>
        </div>
        <div className="flex gap-10 font-mono">
          <span>SERVER_NODE: ASIA-CENTRAL-1</span>
          <span>SYS_TIME: {new Date().toLocaleTimeString([], { hour12: false })}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
