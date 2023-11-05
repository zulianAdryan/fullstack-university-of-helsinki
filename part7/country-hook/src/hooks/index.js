import { useEffect } from "react";
import { useState } from "react";
import CountriesService from "../services/countries";

export const useCountries = () => {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    const response = await CountriesService.getAll();
    setCountries(response);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return {
    countries,
  };
};
