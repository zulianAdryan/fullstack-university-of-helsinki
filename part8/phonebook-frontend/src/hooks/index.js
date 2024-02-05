import { useState } from "react";

export const useField = (type, id) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => setValue("");

  return { value, onChange, type, reset, id };
};
