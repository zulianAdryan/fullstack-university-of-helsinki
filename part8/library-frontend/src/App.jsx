import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NavBar from "./components/NavBar";
import Notify from "./components/Notify";
import Login from "./components/Login";
import Recomendations from "./components/Recomendations";
import { useQuery } from "@apollo/client";
import { ME } from "./services/queries";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useQuery(ME);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2500);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login setError={notify} />} />
        <Route path="/" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/recommendations"
          element={
            <Recomendations favoriteGenre={user?.data?.me?.favoriteGenre} />
          }
        />
        <Route
          path="/create"
          element={
            <NewBook
              setError={notify}
              favoriteGenre={user?.data?.me?.favoriteGenre}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
