import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <button>
        <Link to="/">authors</Link>
      </button>
      <button>
        <Link to="/books">books</Link>
      </button>
      <button>
        <Link to="/create">add book</Link>
      </button>
    </div>
  );
};

export default NavBar;
