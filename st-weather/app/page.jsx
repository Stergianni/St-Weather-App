"use client";

import { useState, useEffect } from "react";

import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import WeatherDetails from "@/components/WeatherDetails";
import ForecastSlider from "@/components/ForecastSlider";
import ForecastList from "@/components/ForecastList";

import { useWeatherData } from "@/hooks/useWeatherData";
import { useGeolocation } from "@/hooks/useGeolocation";

const page = () => {
  const {
    city,
    coords,
    weather,
    forecast,
    airQuality,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  } = useWeatherData();

  const { position, error: geoError, loading: geoLoading, getPosition } = useGeolocation();

  const [expanded, setExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayData, setSelectedDayData] = useState(null);

  // When geolocation is obtained, fetch weather by coords
  useEffect(() => {
    if (position) {
      fetchWeatherByCoords(position.lat, position.lon);
    }
  }, [position, fetchWeatherByCoords]);

  // When forecast or selectedDay changes, update selectedDayData
  useEffect(() => {
    if (!forecast || !forecast.list) {
      setSelectedDay(null);
      setSelectedDayData(null);
      return;
    }

    if (!selectedDay) {
      setSelectedDay(null);
      setSelectedDayData(null);
      return;
    }

    // Filter forecast data for selected day (date string yyyy-mm-dd)
    const dayStart = selectedDay * 1000; // UNIX timestamp seconds → ms
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;

    // Find all forecast entries in that day (3-hour intervals)
    const dayForecasts = forecast.list.filter((entry) => {
      const entryTime = entry.dt * 1000;
      return entryTime >= dayStart && entryTime < dayEnd;
    });

    if (dayForecasts.length === 0) {
      setSelectedDayData(null);
      return;
    }

    // Use the first forecast as summary for that day for main card
    setSelectedDayData({
      ...weather,
      main: dayForecasts[0].main,
      weather: dayForecasts[0].weather,
      wind: dayForecasts[0].wind,
      dt: dayForecasts[0].dt,
    });
  }, [selectedDay, forecast, weather]);

  // When no day selected, show current weather data
  const displayedWeather = selectedDayData || weather;

  // Convert forecast to daily summary for ForecastList
  const dailyForecast = forecast
    ? forecast.list.reduce((acc, entry) => {
      const day = entry.dt_txt.split(" ")[0];
      if (!acc[day]) acc[day] = { dt: entry.dt, temp: { day: entry.main.temp }, weather: entry.weather };
      return acc;
    }, {})
    : {};

  const dailyArray = Object.values(dailyForecast);

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto">
        <SearchBar
          onSearch={(city) => {
            setSelectedDay(null);
            setSelectedDayData(null);
            fetchWeatherByCity(city);
          }}
          onGeoLocate={() => {
            setSelectedDay(null);
            setSelectedDayData(null);
            getPosition();
          }}
        />

        {loading && <p className="mt-6 text-center">Loading...</p>}
        {error && <p className="mt-6 text-center text-red-500">{error}</p>}
        {geoError && <p className="mt-6 text-center text-red-500">{geoError}</p>}

        {displayedWeather && !loading && (
          <>
            <WeatherCard
              weather={displayedWeather}
              airQuality={airQuality}
              uvIndex={null /* Add UV index logic if desired */}
              onExpand={() => setExpanded(!expanded)}
            />

            {forecast && (
              <>
                <ForecastSlider
                  hourly={forecast.list}
                  onSelect={(hour) => {
                    setSelectedDay(hour.dt);
                    setSelectedDayData({
                      ...weather,
                      main: hour.main,
                      weather: hour.weather,
                      wind: hour.wind,
                      dt: hour.dt,
                    });
                    setExpanded(false);
                  }}
                />

                <ForecastList
                  daily={dailyArray}
                  selectedDay={selectedDay}
                  onSelectDay={(day) => {
                    setSelectedDay(day.dt);
                    setSelectedDayData(null);
                    setExpanded(false);
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default page