import { Link } from "react-router-dom";
import Notifications from "./Notifications";

const Navbar = () => {
  const padding = { padding: 5 };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/create">
          Create New
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </div>
      <Notifications />
    </div>
  );
};

export default Navbar;
