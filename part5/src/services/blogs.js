import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getToken = () => {
  // console.log("TOKEN", token);
  if (token) return token;
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  // console.log("loggedUserJSON", loggedUserJSON);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    const userToken = user.token;
    setToken(userToken);
    // console.log("TOKEN", token);
    return token;
  }
  return null;
};

const getConfig = () => ({
  headers: { Authorization: getToken() },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig());
  return response.data;
};

const like = async (blog) => {
  let updatedBlog = { ...blog, likes: blog.likes + 1 };
  // console.log("NEW BLOG: ", updatedBlog);
  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    updatedBlog,
    getConfig()
  );
  return response.data;
};

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, getConfig());
  return response.data;
};

export default { getAll, create, like, deleteBlog, setToken };
