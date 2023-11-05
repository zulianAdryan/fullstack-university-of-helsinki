import axios from "axios";
import getConfig from "../utils/getConfig";

const baseUrl = "/api/blogs";

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

export default { getAll, create, like, deleteBlog };
