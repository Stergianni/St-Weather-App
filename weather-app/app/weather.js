"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Switch,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

const API_KEY = "b74cdbb2340ba20e2593c6520b0d3768";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  const fetchWeatherByCity = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(currentRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const daily = forecastRes.data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily);
    } catch (err) {
      alert("City not found");
    }
    setLoading(false);
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(currentRes.data);
      setCity(currentRes.data.name);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const daily = forecastRes.data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily);
    } catch (err) {
      alert("Could not fetch weather for your location");
    }
    setLoading(false);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        alert("Permission denied");
      }
    );
  };

  useEffect(() => {
    // Try to fetch location on load
    handleGetLocation();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0E0E0E" : "#E4E4E4",
        color: darkMode ? "white" : "#0E0E0E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        p: 3,
        pt: 6,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        St-Weather
      </Typography>

      <Box display="flex" alignItems="center" mb={3}>
        <Typography>Dark Mode</Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          sx={{
            "& .MuiSwitch-thumb": {
              backgroundColor: "#FF6001",
            },
            "& .MuiSwitch-track": {
              backgroundColor: darkMode ? "#BEBEBE" : "#E4E4E4",
            },
          }}
        />
      </Box>

      <Box display="flex" gap={1} alignItems="center" mb={2}>
        <TextField
          label="Enter city"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeatherByCity(city)}
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              color: darkMode ? "white" : "#0E0E0E",
              backgroundColor: darkMode ? "#1e1e1e" : "white",
            },
            "& .MuiInputLabel-root": {
              color: darkMode ? "#FF6001" : "#0E0E0E",
            },
            "& .Mui-focused": {
              color: "#FF6001",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "#FF6001" : "#BEBEBE",
            },
          }}
        />
        <IconButton
          onClick={handleGetLocation}
          sx={{
            color: "#FF6001",
            bgcolor: darkMode ? "#1e1e1e" : "#fff",
            borderRadius: 2,
            border: "1px solid #FF6001",
            "&:hover": {
              bgcolor: "#FF6001",
              color: "white",
            },
          }}
        >
          <MyLocationIcon />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        onClick={() => fetchWeatherByCity(city)}
        sx={{
          mb: 3,
          backgroundColor: "#FF6001",
          color: "white",
          "&:hover": {
            backgroundColor: "#FF7020",
          },
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Get Weather"}
      </Button>

      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          <Typography variant="h5" fontWeight="bold">{weather.name}</Typography>
          <Typography variant="h6">Temperature: {weather.main.temp}°C</Typography>
          <Typography>Condition: {weather.weather[0].description}</Typography>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
            width={80}
          />
        </motion.div>
      )}

      {forecast.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>5-Day Forecast</Typography>
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            {forecast.map((day, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                  textAlign: "center",
                  minWidth: 120,
                }}
              >
                <Typography variant="body1">
                  {new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
                <Typography variant="body2">
                  {day.main.temp.toFixed(1)}°C
                </Typography>
                <Typography variant="caption">{day.weather[0].main}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
