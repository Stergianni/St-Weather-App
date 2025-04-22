"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Switch,
  Box,
  CircularProgress,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";
import Image from "next/image";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [isMounted, setIsMounted] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getUnitSymbol = () => (unit === "metric" ? "°C" : "°F");

  const extractDailySummaries = (data) => {
    const dailyMap = new Map();
    data.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!dailyMap.has(date) && entry.dt_txt.includes("12:00:00")) {
        dailyMap.set(date, entry);
      }
    });
    return Array.from(dailyMap.values()).slice(0, 5);
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b74cdbb2340ba20e2593c6520b0d3768&units=${unit}`
      );
      setWeather(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b74cdbb2340ba20e2593c6520b0d3768&units=${unit}`
      );
      const daily = extractDailySummaries(forecastRes.data.list);
      setForecast(daily);
    } catch (error) {
      alert("City not found");
    }
    setLoading(false);
  };

  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        try {
          const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b74cdbb2340ba20e2593c6520b0d3768&units=${unit}`
          );
          setWeather(weatherRes.data);

          const forecastRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=b74cdbb2340ba20e2593c6520b0d3768&units=${unit}`
          );
          const daily = extractDailySummaries(forecastRes.data.list);
          setForecast(daily);
        } catch (error) {
          alert("Failed to fetch weather for your location.");
        }
        setLoading(false);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!isMounted) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "#E4E4E4",
        color: darkMode ? "white" : "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      {/* Logo + Title */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={6}
        sx={{ flexWrap: "wrap" }}
      >
        <Image
          src="/weather-icon.svg"
          alt="Weather Icon"
          width={60}
          height={60}
          priority
          style={{
            filter: darkMode
              ? "brightness(0) saturate(100%) invert(42%) sepia(94%) saturate(2426%) hue-rotate(3deg) brightness(103%) contrast(106%)"
              : "none",
          }}
        />

        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            textAlign: "center",
            color: darkMode ? "white" : "black",
            fontSize: {
              xs: "1.75rem",
              sm: "2.5rem",
              md: "4rem",
              lg: "5rem",
            },
          }}
        >
          St-Weather App
        </Typography>
      </Box>


      {/* Toggles */}
      <Box display="flex" alignItems="center" gap={4} mb={3}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              sx={{
                "& .MuiSwitch-track": { backgroundColor: "#FF6001" },
                "& .MuiSwitch-thumb": { backgroundColor: "#FF6001" },
              }}
            />
          }
          label="Dark Mode"
        />
        <FormControlLabel
          control={
            <Switch
              checked={unit === "imperial"}
              onChange={() => setUnit(unit === "metric" ? "imperial" : "metric")}
              sx={{
                "& .MuiSwitch-track": { backgroundColor: "#FF6001" },
                "& .MuiSwitch-thumb": { backgroundColor: "#FF6001" },
              }}
            />
          }
          label={unit === "metric" ? "°C" : "°F"}
        />
      </Box>

      {/* Location Button */}
      <IconButton
        onClick={handleLocationClick}
        sx={{
          mb: 3,
          color: "#FF6001",
          "&:hover": { color: "#FF7020" },
        }}
      >
        <MyLocationIcon />
      </IconButton>

      {/* City Input */}
      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{
          mb: 2,
          width: 300,
          "& label.Mui-focused": {
            color: "#FF6001",
          },
          "& label": {
            color: "#FF6001",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: darkMode ? "#121212" : "#E4E4E4", // 👈 set background
            color: darkMode ? "white" : "black",
            "& fieldset": {
              borderColor: darkMode ? "#BEBEBE" : "#FF6001",
            },
            "&:hover fieldset": {
              borderColor: "#FF7020",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF6001",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#FF6001",
          },
        }}        
        onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
      />

      {/* Get Weather Button */}
      <Button
        variant="contained"
        onClick={fetchWeather}
        sx={{
          mb: 3,
          backgroundColor: "#FF6001",
          "&:hover": { backgroundColor: "#FF7020" },
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Get Weather"}
      </Button>

      {/* Current Weather */}
      {weather && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              mb: 4,
              bgcolor: darkMode ? "#1e1e1e" : "#fff",
              color: darkMode ? "white" : "black",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {weather.name}, {weather.sys.country}
            </Typography>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              width={100}
              height={100}
            />
            <Typography variant="h6">
              Temp: {weather.main.temp} {getUnitSymbol()}
            </Typography>
            <Typography>Condition: {weather.weather[0].description}</Typography>
          </Paper>
        </motion.div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {forecast.map((day, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                p: 2,
                width: 150,
                textAlign: "center",
                bgcolor: darkMode ? "#1e1e1e" : "#fff",
                color: darkMode ? "white" : "black",
              }}
            >
              <Typography variant="subtitle1">
                {new Date(day.dt_txt).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
              <Image
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="weather icon"
                width={60}
                height={60}
              />
              <Typography variant="body1">
                {Math.round(day.main.temp)} {getUnitSymbol()}
              </Typography>
              <Typography variant="body2">{day.weather[0].main}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
