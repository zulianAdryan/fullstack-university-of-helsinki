import PropTypes from "prop-types";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  return <div className={isError ? "error" : "success"}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool,
};

export default Notification;
