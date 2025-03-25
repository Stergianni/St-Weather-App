// components/WeatherApp.js

export default function WeatherApp({ weatherData }) {
    return (
      <div className="weather-app">
        <h1>Weather in {weatherData.name}</h1>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      </div>
    );
  }
  