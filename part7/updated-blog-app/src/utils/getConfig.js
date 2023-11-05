import getToken from "./getToken";

const getConfig = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export default getConfig;
