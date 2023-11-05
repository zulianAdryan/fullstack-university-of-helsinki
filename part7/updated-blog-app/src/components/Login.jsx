import { useNavigate } from "react-router-dom";
import { useField, useSetMessage, useUser } from "../hooks";
import loginService from "../services/login";
import Notification from "./Notification";
import { useMutation } from "@tanstack/react-query";
import { Table, Form, Button } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const user = useUser();
  const messageDispatch = useSetMessage();
  const loginMutation = useMutation({ mutationFn: loginService.login });
  const { reset: resetUsername, ...username } = useField("text", "username");
  const { reset: resetPassword, ...password } = useField(
    "password",
    "password"
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    loginMutation.mutate(
      {
        username: username.value,
        password: password.value,
      },
      {
        onSuccess: (userData) => {
          user.set(userData);
          messageDispatch.set({ message: "Login success, welcome back!" });
          navigate("/", { replace: true });
        },
        onError: (error) => {
          console.error("error login", error);
          messageDispatch.set({
            message: error?.response?.data?.error ?? "Wrong credentials",
            isError: true,
          });
        },
      }
    );
  };

  return (
    <div className="p-4">
      <h2>Login to application</h2>
      <Notification />
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control {...username} />
          <Form.Label>password</Form.Label>
          <Form.Control {...password} />
          <Button className="mt-4" id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
