
import React from 'react';
import { Region, ForecastDay } from './types';

export const MOCK_REGIONS: Region[] = [
  {
    id: 'pacific-nw',
    name: 'PACIFIC NORTHWEST',
    data: {
      temp: 18,
      condition: 'Mixed Conditions',
      pressure: 1013,
      humidity: 62,
      windSpeed: 14,
      uvIndex: 4,
      visibility: 14,
      solarIrrad: 842,
      vaporDensity: 12.4
    }
  },
  {
    id: 'se-asia',
    name: 'SOUTHEAST ASIA',
    alert: 'High Humidity Alert',
    data: {
      temp: 32,
      condition: 'Thundershowers',
      pressure: 1008,
      humidity: 88,
      windSpeed: 8,
      uvIndex: 11,
      visibility: 8,
      solarIrrad: 950,
      vaporDensity: 24.1
    }
  },
  {
    id: 'n-europe',
    name: 'NORTHERN EUROPE',
    alert: 'Low Pressure System',
    data: {
      temp: 12,
      condition: 'Partly Cloudy',
      pressure: 998,
      humidity: 45,
      windSpeed: 22,
      uvIndex: 2,
      visibility: 25,
      solarIrrad: 310,
      vaporDensity: 8.2
    }
  }
];

export const MOCK_FORECAST: ForecastDay[] = [
  { day: 'TODAY', tempHigh: 20, tempLow: 14, icon: 'thunderstorm', condition: 'Thunderstorm' },
  { day: 'TUESDAY', tempHigh: 24, tempLow: 18, icon: 'sunny', condition: 'Clear Sky' },
  { day: 'WEDNESDAY', tempHigh: 17, tempLow: 11, icon: 'rainy', condition: 'Moderate Rain' },
  { day: 'THURSDAY', tempHigh: 16, tempLow: 12, icon: 'cloudy_snowing', condition: 'Light Snow' },
  { day: 'FRIDAY', tempHigh: 21, tempLow: 15, icon: 'partly_cloudy_day', condition: 'Partly Cloudy' },
  { day: 'SATURDAY', tempHigh: 18, tempLow: 13, icon: 'water_drop', condition: 'Showers' },
  { day: 'SUNDAY', tempHigh: 26, tempLow: 19, icon: 'wb_sunny', condition: 'Clear Sky' },
];
