"use client"; // This makes sure this is a client-side component
import { useState } from "react";  // Ensure you have the correct imports
import axios from "axios";
import { TextField, Button, Paper, Typography, Switch, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion"; // For animations
import { useTheme } from "./theme-provider"; // Custom theme provider

export default function Weather() {
  const [city, setCity] = useState("");  // Manage the city state
  const [weather, setWeather] = useState(null);  // Manage the weather data state
  const [loading, setLoading] = useState(false);  // Manage the loading state
  const { darkMode, setDarkMode } = useTheme();  // Theme management

  // Fetch weather data
  const fetchWeather = async () => {
    if (!city) return; // Prevent fetch if city is empty
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b74cdbb2340ba20e2593c6520b0d3768&units=metric`
      );
      setWeather(response.data);  // Update weather data
    } catch (error) {
      alert("City not found");  // Error handling
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "55vh",
        bgcolor: darkMode ? "var(--accent)" : "var(--background)", // Use CSS variables for background color
        color: darkMode ? "white" : "var(--accent)", // Text color based on dark mode
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box display="flex" alignItems="center" mb={3}>
        <Typography>Dark Mode</Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          sx={{
            '& .MuiSwitch-thumb': {
              backgroundColor: darkMode ? 'var(--highlight)' : 'var(--primary)', // Orange for dark mode and light mode
            },
            '& .MuiSwitch-track': {
              backgroundColor: darkMode ? 'var(--secondary)' : 'white', // Gray or white for track color
            },
            '&.Mui-checked .MuiSwitch-thumb': {
              backgroundColor: 'var(--highlight)', // Ensure the switch thumb is always the highlight color when checked
            },
            '&.Mui-checked .MuiSwitch-track': {
              backgroundColor: darkMode ? 'var(--primary)' : 'var(--highlight)', // Track color when checked
            },
          }}
        />
      </Box>

      <TextField
  label="Enter city"
  variant="outlined"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  sx={{
    mb: 2,
    width: 300,
    input: {
      color: darkMode ? "white" : "black",
    },
    '& .MuiInputLabel-root': {
      color: darkMode ? "white" : "black",
      '&.Mui-focused': {
        color: darkMode ? "white" : "#FF6001", // ✅ orange in light, white in dark
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: darkMode ? "white" : "black",
      },
      '&:hover fieldset': {
        borderColor: darkMode ? "#FF7020" : "#FF6001", // Lighter or deeper orange
      },
      '&.Mui-focused fieldset': {
        borderColor: darkMode ? "white" : "#FF6001", // ✅ no blue border
      },
    },
  }}
  onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
/>


      <Button
        variant="contained"
        sx={{
          mb: 3,
          bgcolor: "var(--primary)", // Custom orange color for the button
          color: "white",
          '&:hover': {
            bgcolor: "var(--highlight)", // Lighter orange for hover effect
          },
        }}
        onClick={fetchWeather}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Get Weather"}
      </Button>

      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={4} sx={{
            p: 3,
            textAlign: "center",
            bgcolor: darkMode ? "var(--secondary)" : "white",
          }}>
            <Typography variant="h5" fontWeight="bold">
              {weather.name}
            </Typography>
            <Typography variant="h6">Temperature: {weather.main.temp}°C</Typography>
            <Typography>Condition: {weather.weather[0].description}</Typography>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
}
