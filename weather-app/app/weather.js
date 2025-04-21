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
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric"); // 'metric' for °C, 'imperial' for °F
  const [isMounted, setIsMounted] = useState(false); // Track component mount
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    setIsMounted(true); // Set the mounted state to true after component is mounted
  }, []);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b74cdbb2340ba20e2593c6520b0d3768&units=${unit}`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found");
    }
    setLoading(false);
  };

  const getUnitSymbol = () => (unit === "metric" ? "°C" : "°F");

  // Handle user's location button click
  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b74cdbb2340ba20e2593c6520b0d3768&units=${unit}`
          );
          setWeather(response.data);
        } catch (error) {
          alert("Failed to fetch weather for your location.");
        }
        setLoading(false);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!isMounted) {
    return null; // Prevent rendering until client-side mounting is complete
  }

  return (
    <Box
      sx={{
        minHeight: "55vh",
        bgcolor: darkMode ? "#121212" : "#f4f4f4",
        color: darkMode ? "white" : "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      {/* Theme + Unit Toggles */}
      <Box display="flex" alignItems="center" gap={4} mb={3}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              sx={{
                "& .MuiSwitch-track": {
                  backgroundColor: darkMode ? "#FF6001" : "#FF6001",
                },
                "& .MuiSwitch-thumb": {
                  backgroundColor: darkMode ? "#FF6001" : "#FF6001",
                },
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
                "& .MuiSwitch-track": {
                  backgroundColor: darkMode ? "#FF6001" : "#FF6001",
                },
                "& .MuiSwitch-thumb": {
                  backgroundColor: darkMode ? "#FF6001" : "#FF6001",
                },
              }}
            />
          }
          label={unit === "metric" ? "°C" : "°F"}
        />
      </Box>

      {/* Location Button */}
      <IconButton
        color="primary"
        onClick={handleLocationClick}
        sx={{
          mb: 3,
          color: darkMode ? "#FF6001" : "#FF6001",
          "&:hover": {
            color: "#FF7020",
          },
        }}
      >
        <MyLocationIcon />
      </IconButton>

      {/* Input & Button */}
      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{
          mb: 2,
          width: 300,
          "& label.Mui-focused": {
            color: "#FF6001", // Always orange
          },
          "& label": {
            color: darkMode ? "#FF6001" : "#FF6001", // Always orange, even when not focused
          },
          "& .MuiOutlinedInput-root": {
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
          // Placeholder color change in dark mode
          "& .MuiInputBase-input::placeholder": {
            color: darkMode ? "#FF6001" : "#FF6001", // Always orange placeholder
          },
        }}
        onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
      />

      <Button
        variant="contained"
        onClick={fetchWeather}
        sx={{
          mb: 3,
          backgroundColor: "#FF6001",
          "&:hover": {
            backgroundColor: "#FF7020",
          },
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Get Weather"}
      </Button>

      {/* Weather Result */}
      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              bgcolor: darkMode ? "#1e1e1e" : "#fff",
              color: darkMode ? "white" : "black", // Paper font color is white in dark mode
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
              style={{ margin: "0 auto" }}
            />
            <Typography variant="h6">
              Temperature: {weather.main.temp}
              {getUnitSymbol()}
            </Typography>
            <Typography>Condition: {weather.weather[0].description}</Typography>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
}
