import { Sun, Sunrise, Sunset, Gauge } from "lucide-react";
import { formatTime } from "@/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";

const WeatherDetails = ({ weather, uvIndex }) => {
  if (!weather) return null;

  const {
    main: { pressure } = {},
    sys: { sunrise, sunset } = {},
    timezone,
  } = weather;

  return (
    <Card className="max-w-md mx-auto mt-4 p-4 shadow-md">
      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          <span>Pressure: {pressure ? `${pressure} hPa` : "N/A"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Sunrise className="w-4 h-4" />
          <span>Sunrise: {formatTime(sunrise, timezone)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4" />
          <span>UV Index: {uvIndex ?? "N/A"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Sunset className="w-4 h-4" />
          <span>Sunset: {formatTime(sunset, timezone)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
