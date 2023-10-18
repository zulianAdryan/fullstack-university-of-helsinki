import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useRef } from "react";

const App = () => {
  const defaultLoginForm = { username: "", password: "" };
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState(defaultLoginForm);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
      blogService.setToken(userLogin.token);
      setMessage("Login success, welcome back!");
      setIsError(false);
    } catch (error) {
      console.error("error login", error);
      setMessage(error?.response?.data?.error ?? "Wrong credentials");
      setIsError(true);
    } finally {
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const handleCreateBlog = async (blogForm) => {
    try {
      const newBlog = await blogService.create(blogForm);
      setMessage(`a new blog ${blogForm.title} by ${blogForm.author} added`);
      setBlogs((current) => current.concat(newBlog));
      setIsError(false);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.error("error create blog", error);
      setMessage(error?.response?.data?.error ?? "Failed to create blog");
      setIsError(true);
    } finally {
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleLikeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog);
      // console.log("RESPONSE", updatedBlog);
      const updatedBlogs = blogs.map((blogItem) =>
        blogItem.id === blog.id ? updatedBlog : blogItem
      );
      setBlogs(updatedBlogs);
      setMessage(`Success like blog ${blog.title}`);
      setIsError(false);
    } catch (error) {
      console.error("error like blog", error);
      setMessage(
        error?.response?.data?.error ?? `Failed to like blog ${blog.title}`
      );
      setIsError(true);
    } finally {
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog);
      setBlogs((current) =>
        current.filter((blogItem) => blogItem.id !== blog.id)
      );
      setMessage(`Success delete blog ${blog.title}`);
      setIsError(false);
    } catch (error) {
      console.error("error delete blog", error);
      setMessage(
        error?.response?.data?.error ?? `Failed to delete blog ${blog.title}`
      );
      setIsError(true);
    } finally {
      setTimeout(() => setMessage(null), 5000);
    }
  };
  const renderBlogForm = () => (
    <Togglable
      buttonShowLabel="new note"
      buttonHideLabel="cancel"
      ref={blogFormRef}
    >
      <BlogForm onSubmit={handleCreateBlog} />
    </Togglable>
  );

  const renderBlog = (blogs) => {
    if (blogs.length) {
      return blogs
        .sort((prev, current) => current.likes - prev.likes)
        .map((blog) => (
          <Blog
            user={user}
            blog={blog}
            onLike={handleLikeBlog}
            onDelete={handleDeleteBlog}
            key={blog.id}
          />
        ));
    } else {
      return <p>There is no any blog yet</p>;
    }
  };

  return (
    <div>
      <Notification message={message} isError={isError} />
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
          {renderBlogForm()}
          {renderBlog(blogs)}
        </div>
      )}
    </div>
  );
};

export default App;
