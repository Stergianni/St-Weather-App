"use client";

import { useState } from "react";
import { formatTime, formatTemperature } from "@/lib/formatters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ForecastSlider = ({ hourly = [], onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!hourly.length) return null;

  const handleSelect = (idx) => {
    setSelectedIndex(idx);
    if (onSelect) onSelect(hourly[idx]);
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap py-4">
      <div className="flex gap-4 px-2 h-[170px] justify-center items-center">
        {hourly.map((hour, idx) => {
          const time = formatTime(hour.dt, hour.timezone_offset || 0);
          const temp = hour.main?.temp !== undefined ? formatTemperature(hour.main.temp) : "N/A";
          const icon = hour.weather?.[0]?.icon;
          const description = hour.weather?.[0]?.description;

          const isSelected = selectedIndex === idx;

          return (
            <Card
              key={hour.dt}
              onClick={() => handleSelect(idx)}
              
            // className={`min-w-[72px] cursor-pointer text-center transition-colors ${
            //   isSelected ? "bg-blue-600 text-white" : "bg-muted"
            // }`}
            >
              <CardContent className="flex flex-col items-center p-2 space-y-1">
                <span className="text-xs">{time}</span>
                {icon && (
                  <Image
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={description}
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                )}
                <span className="text-sm font-medium">{temp}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ForecastSlider;


