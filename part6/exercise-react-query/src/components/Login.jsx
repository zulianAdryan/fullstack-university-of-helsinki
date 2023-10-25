/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import loginService from "../services/login";
import { CONSTANTS } from "../utils/constants";

const Login = ({ callbackMessage, onSubmit }) => {
  const loginMutation = useMutation({ mutationFn: loginService.login });

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (response) => {
          callbackMessage("Login success, welcome back!");
          window.localStorage.setItem(
            CONSTANTS.LOCAL_STORAGE,
            JSON.stringify(response)
          );
          onSubmit();
        },
        onError: (error) => {
          callbackMessage(error?.response?.data?.error ?? "Wrong credentials");
        },
        onSettled: () => {
          setTimeout(() => callbackMessage(null), 1500);
        },
      }
    );
  };

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={onSubmitForm}>
        <p>
          username
          <input type="text" id="username" name="username" />
        </p>
        <p>
          password
          <input type="password" id="password" name="password" />
        </p>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
