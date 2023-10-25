import { useMessageDispatch } from "../context/AnecdotesContext";

export const useSetMessage = () => {
  const dispatch = useMessageDispatch();

  const setMessage = (message, interval = 5000) => {
    dispatch({ type: "SET_MESSAGE", payload: message });
    setTimeout(() => {
      dispatch({ type: "RESET_MESSAGE" });
    }, interval);
  };

  return { set: (message) => setMessage(message) };
};
