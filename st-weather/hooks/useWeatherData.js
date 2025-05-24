import { useState, useEffect, useCallback } from "react";
import {
  getCoordinatesByCity,
  getWeatherByCoords,
  getForecastByCoords,
  getAirQualityByCoords,
} from "@/lib/api";

export function useWeatherData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null); // { lat, lon }
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  const fetchWeatherByCity = useCallback(async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const location = await getCoordinatesByCity(cityName);
      if (!location) throw new Error("City not found");

      setCity(location.name);
      setCoords({ lat: location.lat, lon: location.lon });

      // Fetch weather, forecast, and AQI concurrently
      const [weatherData, forecastData, airQualityData] = await Promise.all([
        getWeatherByCoords(location.lat, location.lon),
        getForecastByCoords(location.lat, location.lon),
        getAirQualityByCoords(location.lat, location.lon),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setAirQuality(airQualityData);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      setCity("");
      setCoords(null);
      setWeather(null);
      setForecast(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (latitude, longitude) => {
    setLoading(true);
    setError(null);

    try {
      setCoords({ lat: latitude, lon: longitude });

      // We can skip city lookup here or do reverse geocoding if needed
      const [weatherData, forecastData, airQualityData] = await Promise.all([
        getWeatherByCoords(latitude, longitude),
        getForecastByCoords(latitude, longitude),
        getAirQualityByCoords(latitude, longitude),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setAirQuality(airQualityData);
      setCity(weatherData.name || "");
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      setCity("");
      setCoords(null);
      setWeather(null);
      setForecast(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    city,
    coords,
    weather,
    forecast,
    airQuality,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  };
}
