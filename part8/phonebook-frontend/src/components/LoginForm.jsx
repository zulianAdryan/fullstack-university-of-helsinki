import { useMutation } from "@apollo/client";
import { useField } from "../hooks";
import { LOGIN } from "../services/queries";
import { useEffect } from "react";

const LoginForm = ({ setToken, setError }) => {
  const { reset: resetUsername, ...username } = useField("text", "username");
  const { reset: resetPassword, ...password } = useField(
    "password",
    "password"
  );
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem(import.meta.env.VITE_APP_STORAGE_KEY, token);
    }
  }, [result.data]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      login({
        variables: { username: username.value, password: password.value },
      });
      resetUsername();
      resetPassword();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
