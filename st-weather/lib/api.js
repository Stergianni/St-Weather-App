// /lib/api.js

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

const handleResponse = async (res) => {
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  if (!data || Object.keys(data).length === 0) throw new Error("No data returned.");
  return data;
};

// 🔍 Get coordinates from city name
export const getCoordinatesByCity = async (city) => {
  const res = await fetch(`${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const data = await handleResponse(res);
  return data[0]; // first match
};

// 📍 Get weather by coordinates
export const getWeatherByCoords = async (lat, lon, units = "metric") => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );
  return handleResponse(res);
};

// 🌡 5-day forecast
export const getForecastByCoords = async (lat, lon, units = "metric") => {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );
  return handleResponse(res);
};

// 🌬 Air Quality
export const getAirQualityByCoords = async (lat, lon) => {
  const res = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  return handleResponse(res);
};

// 🔆 UV Index (legacy endpoint, included in One Call v3 - if needed, adjust)
export const getUVIndexByCoords = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/uvi?appid=${API_KEY}&lat=${lat}&lon=${lon}`
  );
  return handleResponse(res);
};
