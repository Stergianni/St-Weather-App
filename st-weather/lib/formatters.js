// /lib/formatters.js

export const formatTemperature = (temp, unit = "°C") =>  temp !== null && temp !== undefined ? `${Math.round(temp)}${unit}` : "N/A";

export const formatTime = (timestamp, timezoneOffset = 0) => {
  if (!timestamp) return "N/A";
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
};

export const getAQILevel = (aqi) => {
  switch (aqi) {
    case 1: return "Good";
    case 2: return "Fair";
    case 3: return "Moderate";
    case 4: return "Poor";
    case 5: return "Very Poor";
    default: return "Unknown";
  }
};
