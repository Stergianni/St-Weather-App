
"use client";

import { formatDate, formatTemperature } from "@/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ForecastList = ({ daily = [], selectedDay, onSelectDay }) => {
  if (!daily.length) return null;

  return (
    <div className="flex justify-center flex-wrap gap-3 mt-4 mx-auto h-[150px]">
      {daily.map((day) => {
        const dateLabel = formatDate(day.dt);
        const temp = day.temp?.day !== undefined ? formatTemperature(day.temp.day) : "N/A";
        const isSelected = selectedDay === day.dt;
        const icon = day.weather?.[0]?.icon;
        const description = day.weather?.[0]?.description;

        return (
          <Card
            key={day.dt}
            onClick={() => onSelectDay(day)}
            // className={`w-[72px] cursor-pointer text-center transition-colors ${
            //   isSelected ? "bg-blue-600 text-white" : "bg-muted hover:bg-accent"
            // }`}
          >
            <CardContent className="flex flex-col items-center p-2 space-y-1">
              <span className="text-xs">{dateLabel}</span>
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
  );
};

export default ForecastList;
