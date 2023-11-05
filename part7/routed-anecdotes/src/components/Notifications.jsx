import { useSelector } from "react-redux";

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  return <div>{notifications}</div>;
};

export default Notifications;
