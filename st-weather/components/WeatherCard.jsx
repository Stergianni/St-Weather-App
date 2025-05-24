"use client";

import { ArrowDown, Droplets, Thermometer, Wind } from "lucide-react";
import Image from "next/image";
import Badge from "./Badge";
import { formatTemperature, formatTime } from "@/lib/formatters";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Sun, Sunrise, Sunset, Gauge } from "lucide-react";

const aqiColors = [
  "bg-gray-300",
  "bg-green-500",
  "bg-yellow-400",
  "bg-orange-400",
  "bg-red-500",
  "bg-purple-600",
];
const aqiLabels = ["N/A", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

const WeatherCard = ({ weather, airQuality, uvIndex, onExpand }) => {
  if (!weather) return null;

  const {
    name,
    sys: { country, sunrise, sunset } = {},
    weather: weatherDetails = [],
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure } = {},
    wind: { speed } = {},
    timezone,
  } = weather;

  const description = weatherDetails[0]?.description || "";
  const iconCode = weatherDetails[0]?.icon || "";
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  const aqi = airQuality?.list?.[0]?.main?.aqi || 0;

  return (
    <Card className="max-w-md mx-auto p-4 shadow-lg">
      <CardHeader className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-bold">
            {name}, {country}
          </h2>
          <p className="capitalize text-sm text-muted-foreground">{description}</p>
        </div>
        {iconUrl && (
          <Image src={iconUrl} alt={description} width={60} height={60} />
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Max/Min Temperature */}
        <div className="text-center text-3xl font-semibold">
          {formatTemperature(temp_max)} / {formatTemperature(temp_min)}
        </div>

        {/* Feels like + AQI + UV */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            <span>Feels like: {formatTemperature(feels_like)}</span>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <Badge
              label={`AQI: ${aqiLabels[aqi] || "N/A"}`}
              colorClass={aqiColors[aqi] || "bg-gray-300"}
            />
            {uvIndex !== undefined && uvIndex !== null && (
              <div className="flex items-center gap-1">
                <Sun className="w-4 h-4" />
                <span>{uvIndex ?? "N/A"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Wind + Humidity */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4" />
            <span>{speed} m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            <span>{humidity}%</span>
          </div>
        </div>

        {/* Pressure */}
        <div className="flex items-center gap-2 text-sm">
          <Gauge className="w-4 h-4" />
          <span>{pressure ? `${pressure} hPa` : "N/A"}</span>
        </div>

        {/* Sunrise + Sunset */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Sunrise className="w-4 h-4" />
            <span>{formatTime(sunrise, timezone)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sunset className="w-4 h-4" />
            <span>{formatTime(sunset, timezone)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
