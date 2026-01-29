
export interface WeatherData {
  temp: number;
  condition: string;
  pressure: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  visibility: number;
  solarIrrad: number;
  vaporDensity: number;
}

export interface Region {
  id: string;
  name: string;
  alert?: string;
  data: WeatherData;
}

export interface ForecastDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  icon: string;
  condition: string;
}

export interface AppState {
  currentRegion: Region;
  forecast: ForecastDay[];
  activeLayer: 'temperature' | 'wind' | 'precipitation' | 'satellite';
  isSearching: boolean;
}
