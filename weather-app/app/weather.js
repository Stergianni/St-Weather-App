"use client";
import { useState } from "react";
import axios from "axios";
import { useTheme } from "./theme-provider";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const { darkMode, setDarkMode } = useTheme();

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b74cdbb2340ba20e2593c6520b0d3768&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-5 ${darkMode ? "bg-[#0E0E0E] text-white" : "bg-[#E4E4E4] text-black"}`}>
      <button onClick={() => setDarkMode(!darkMode)} className="mb-4 p-2 bg-primary text-white rounded">
        Toggle Dark Mode
      </button>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <button onClick={fetchWeather} className="p-2 bg-highlight text-white rounded">
        Get Weather
      </button>
      {weather && (
        <div className="mt-4 p-4 border rounded bg-secondary">
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}