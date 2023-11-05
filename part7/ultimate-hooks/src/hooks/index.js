import { useEffect, useState } from "react";
import apiServices from "../services/api";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };
  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    apiServices.getAll(baseUrl).then((response) => setResources(response));
  }, []);

  const create = async (resource) => {
    const response = await apiServices.createNew(baseUrl, resource);
    setResources((current) => current.concat(response));
  };

  const service = {
    create,
  };

  return [resources, service];
};
