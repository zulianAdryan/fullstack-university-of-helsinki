import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NavBar from "./components/NavBar";
import Notify from "./components/Notify";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <NavBar />
      <Routes>
        <Route path="/" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/create" element={<NewBook setError={notify} />} />
      </Routes>
    </div>
  );
};

export default App;
