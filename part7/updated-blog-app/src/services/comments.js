import axios from "axios";
import getConfig from "../utils/getConfig";
const baseUrl = `/api/comments`;

const getAll = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`, getConfig());
  return response.data;
};

const create = async (comment) => {
  const response = await axios.post(baseUrl, comment, getConfig());
  return response.data;
};

export default { getAll, create };
