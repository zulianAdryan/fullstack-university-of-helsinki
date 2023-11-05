import { Navigate, useLocation } from "react-router-dom";
import isHasSession from "../utils/isHasSession";

const render = (component) => {
  return component;
};

const Private = ({ component: Component }) => {
  const location = useLocation();

  // console.log("hassSession Callback", isHasSession());

  return isHasSession() ? (
    render(Component)
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default Private;
