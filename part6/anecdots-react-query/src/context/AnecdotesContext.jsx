/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";

const initialStateMessage = null;

const messageReducer = (state = initialStateMessage, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    case "RESET_MESSAGE":
      return initialStateMessage;
    default:
      return state;
  }
};

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, 0);

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  );
};

export const useMessageValue = () => {
  const messageAndDispatch = useContext(MessageContext);
  return messageAndDispatch[0];
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(MessageContext);
  return messageAndDispatch[1];
};

export default MessageContext;
