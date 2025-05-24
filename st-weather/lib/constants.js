// /lib/constants.js

export const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";
export const GEO_API_BASE_URL = "https://api.openweathermap.org/geo/1.0";

// Units: metric (Celsius), imperial (Fahrenheit)
export const DEFAULT_UNITS = "metric";

export const AQI_LEVELS = [
  { label: "Good", color: "bg-green-500" },
  { label: "Fair", color: "bg-yellow-400" },
  { label: "Moderate", color: "bg-orange-400" },
  { label: "Poor", color: "bg-red-500" },
  { label: "Very Poor", color: "bg-purple-600" },
];
