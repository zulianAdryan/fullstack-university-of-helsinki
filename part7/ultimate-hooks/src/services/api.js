import axios from "axios";

const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (baseUrl, resource) => {
  const newResource = await axios.post(baseUrl, resource);
  return newResource.data;
};

export default { getAll, createNew };
