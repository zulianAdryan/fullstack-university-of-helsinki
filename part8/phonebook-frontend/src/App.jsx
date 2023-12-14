import { useEffect, useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_PERSONS } from "./services/queries";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

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

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

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
