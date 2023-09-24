import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";

const App = () => {
  const defaultLoginForm = { username: "", password: "" };
  const defaultBlogForm = { title: "", author: "", url: "" };
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState(defaultLoginForm);
  const [blogForm, setBlogForm] = useState(defaultBlogForm);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userLogin = await loginService.login(loginForm);
      setUser(userLogin);
      setLoginForm(defaultLoginForm);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userLogin)
      );
      setErrorMessage("Login success, welcome back!");
      setIsError(false);
    } catch (error) {
      console.error("error login", error);
      setErrorMessage(error?.response?.data?.error ?? "Wrong credentials");
      setIsError(true);
    } finally {
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create(blogForm);
      setBlogs((current) => current.concat(newBlog));
      setErrorMessage(
        `a new blog ${blogForm.title} by ${blogForm.author} added`
      );
      setIsError(false);
    } catch (error) {
      console.error("error create blog", error);
      setErrorMessage(error?.response?.data?.error ?? "Failed to create blog");
      setIsError(true);
    } finally {
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <Notification message={errorMessage} isError={isError} />
      {!user ? (
        <LoginForm onChangeInput={setLoginForm} onSubmit={handleLogin} />
      ) : (
        <div>
          <h1>Blogs App</h1>
          <p>
            {user.name} logged in{" "}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <BlogForm onChangeInput={setBlogForm} onSubmit={handleCreateBlog} />
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
