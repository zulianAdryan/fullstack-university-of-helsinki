/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_PERSONS, PERSON_ADDED } from "./services/queries";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery({ query }, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

  useEffect(() => {
    if (!token) {
      const savedToken = localStorage.getItem(
        import.meta.env.VITE_APP_STORAGE_KEY
      );
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);

  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data?.data?.personAdded;
      notify(`${addedPerson?.name} added`);
      updateCache(client.cache, ALL_PERSONS, addedPerson);
      console.log("subscribe", data);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button type="button" onClick={logout}>
        logout
      </button>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  );
};

export default App;
