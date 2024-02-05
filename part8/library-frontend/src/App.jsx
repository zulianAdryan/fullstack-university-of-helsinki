/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NavBar from "./components/NavBar";
import Notify from "./components/Notify";
import Login from "./components/Login";
import Recomendations from "./components/Recomendations";
import { useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED, ME } from "./services/queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item?.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery({ query }, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useQuery(ME);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2500);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data?.data?.bookAdded;
      notify(`${addedBook?.title} added`);
      updateCache(client.cache, ALL_BOOKS, addedBook);
      // console.log("subscribe", data);
    },
  });

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
