import { useState, useEffect } from "react";
import WeatherService from "../services/weather";

const Weather = ({ name, capital }) => {
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    WeatherService.getWeather(name)
      .then((weatherData) => {
        // console.log("weather data: ", weatherData);
        setWeather(weatherData);
      })
      .catch((error) => {
        const { response } = error;
        // console.log("error", response.data.message);
        setMessage(response.data.message);
      });
  }, []);

  if (message) {
    return (
      <div>
        <p>
          Unfortunately because of the free subscription type, weather cannot be
          obtained (at least until now). Message from Open Weather Map:
        </p>
        <b>{message}</b>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div>
      <h2>{`Weather in ${capital}`}</h2>
      <p>{`temperature ${weather.main.temp} Celcius`}</p>
      <img
        src={weather.weather[0].icon}
        alt="weather-icon"
        width={100}
        height={100}
      />
      <p>{`wind ${weather.wind.speed} m/s`}</p>
    </div>
  );
};

export default Weather;
