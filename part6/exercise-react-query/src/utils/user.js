import { CONSTANTS } from "./constants";

const getToken = () => {
  let token = null;
  const loggedUserJSON = window.localStorage.getItem(CONSTANTS.LOCAL_STORAGE);
  if (loggedUserJSON) {
    token = JSON.parse(loggedUserJSON).token;
  }
  return token;
};

export default { getToken };
