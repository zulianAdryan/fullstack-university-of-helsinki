import { Alert } from "react-bootstrap";
import { useMessageValue } from "../context/BlogsContext";

const Notification = () => {
  const test = useMessageValue();
  const { message, isError } = test;

  // console.log(test);
  // console.log({ message, isError });

  if (message === null) {
    return null;
  }

  return <Alert variant={isError ? "danger" : "success"}>{message}</Alert>;
};

export default Notification;
