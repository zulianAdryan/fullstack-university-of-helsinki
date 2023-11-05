import { useContext, createContext, useReducer } from "react";

const initialState = { message: null, isError: false };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    case "RESET_MESSAGE":
      return initialState;
    default:
      return state;
  }
};

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, initialState);

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
