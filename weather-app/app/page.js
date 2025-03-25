// app/page.js

"use client"; // Indicating that this file uses client-side hooks (useState, useEffect)

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the WeatherApp component with client-side rendering
const WeatherApp = dynamic(() => import("../components/WeatherApp"), { ssr: false });

export default function Page() {
  const [weatherData, setWeatherData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const city = "New York"; // You can change this to a dynamic city

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeatherData(data);
    };

    fetchWeather();
  }, []);

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <WeatherApp weatherData={weatherData} />
    </div>
  );
}
