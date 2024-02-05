import { Link, useNavigate } from "react-router-dom";
import { useStorage } from "../hooks";

const NavBar = () => {
  const { storageClear, storageGetItem } = useStorage();
  const isLoggedIn = storageGetItem("_t") ? true : false;
  const navigate = useNavigate();

  console.log("isLoggedIn", isLoggedIn);

  const handleLogout = () => {
    storageClear();
    navigate("/login");
  };

  return (
    <div>
      <Link to="/">
        <button>authors</button>
      </Link>
      <Link to="/books">
        <button>books</button>
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/create">
            <button>add book</button>
          </Link>
          <Link to="/recommendations">
            <button>recommendations</button>
          </Link>
        </>
      ) : null}

      <button>
        {isLoggedIn ? (
          <span onClick={handleLogout}>logout</span>
        ) : (
          <Link to="/login">login</Link>
        )}
      </button>
    </div>
  );
};

export default NavBar;
