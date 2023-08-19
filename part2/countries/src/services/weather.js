import axios from "axios";
const baseUrl = "https://api.openweathermap.org";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = async (countryName) => {
  const request = axios.get(
    `${baseUrl}/data/2.5/weather?q=${countryName}&units=metric&appid=${API_KEY}`
  );
  const response = await request;
  return response.data;
};

export default {
  getWeather,
};
