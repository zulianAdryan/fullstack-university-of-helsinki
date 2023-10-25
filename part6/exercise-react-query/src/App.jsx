import { useEffect, useState } from "react";
import NotesForm from "./components/NotesForm";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { CONSTANTS } from "./utils/constants";

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const checkLoggedUser = () => {
    const loggedUserJSON = window.localStorage.getItem(CONSTANTS.LOCAL_STORAGE);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  };

  useEffect(() => {
    checkLoggedUser();
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <Notification message={message} />
      {!user ? (
        <Login
          onSubmit={checkLoggedUser}
          callbackMessage={(callback) => setMessage(callback)}
        />
      ) : (
        <div>
          <h2>Notes app</h2>
          <p>
            Welcome back {user?.name}!{" "}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <NotesForm callbackMessage={(callback) => setMessage(callback)} />
          <Notes />
        </div>
      )}
    </div>
  );
};

export default App;
