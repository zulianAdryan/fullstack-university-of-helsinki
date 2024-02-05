import { useMutation } from "@apollo/client";
import { useField, useStorage } from "../hooks";
import { LOGIN } from "../services/queries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setError }) => {
  const navigate = useNavigate();
  const { storageSetItem, storageGetItem } = useStorage();
  const { reset: resetUserName, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");
  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      // console.log("error: ", error);
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await login({
      variables: {
        username: username.value,
        password: password.value,
      },
    });
    const token = response?.data?.login?.value;
    if (token) {
      console.log("token", token);
      storageSetItem("_t", token);
      resetUserName();
      resetPassword();
      navigate("/");
    }
  };

  useEffect(() => {
    const token = storageGetItem("_t");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username</label>
        <input {...username} />
      </div>
      <div>
        <label>Password</label>
        <input {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
