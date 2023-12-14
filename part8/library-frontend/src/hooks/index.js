import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => setValue(event.target.value);
  const reset = () => setValue("");

  return { type, value, onChange, reset };
};

export const useStorage = () => {
  const storageSetItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const storageGetItem = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const storageClear = () => localStorage.clear();

  return { storageSetItem, storageGetItem, storageClear };
};
