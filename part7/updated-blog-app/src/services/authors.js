import axios from "axios";
import getConfig from "../utils/getConfig";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const getAuthorOf = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default { getAll, getAuthorOf };
