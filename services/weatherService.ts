
export interface LocationData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export const searchLocations = async (query: string): Promise<LocationData[]> => {
  if (!query || query.length < 2) return [];
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
};

export const fetchWeatherData = async (lat: number, lon: number) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Map WMO codes to material icons
    const getIcon = (code: number) => {
      if (code === 0) return 'wb_sunny';
      if (code <= 3) return 'partly_cloudy_day';
      if (code <= 48) return 'cloudy';
      if (code <= 67) return 'rainy';
      if (code <= 77) return 'ac_unit';
      if (code <= 82) return 'water_drop';
      if (code <= 99) return 'thunderstorm';
      return 'help';
    };

    const getConditionText = (code: number) => {
      if (code === 0) return 'Clear Sky';
      if (code <= 3) return 'Partly Cloudy';
      if (code <= 48) return 'Foggy';
      if (code <= 67) return 'Drizzle/Rain';
      if (code <= 77) return 'Snowfall';
      if (code <= 82) return 'Showers';
      return 'Stormy';
    };

    return {
      current: {
        temp: Math.round(data.current.temperature_2m),
        condition: getConditionText(data.current.weather_code),
        pressure: Math.round(data.current.pressure_msl),
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        icon: getIcon(data.current.weather_code)
      },
      forecast: data.daily.time.map((time: string, i: number) => ({
        day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(time)).toUpperCase(),
        tempHigh: Math.round(data.daily.temperature_2m_max[i]),
        tempLow: Math.round(data.daily.temperature_2m_min[i]),
        icon: getIcon(data.daily.weather_code[i]),
        condition: getConditionText(data.daily.weather_code[i])
      })),
      extra: {
        uvIndex: data.daily.uv_index_max[0]
      }
    };
  } catch (error) {
    console.error("Weather fetch error:", error);
    throw error;
  }
};
