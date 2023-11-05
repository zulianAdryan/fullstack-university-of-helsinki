const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem(
    import.meta.env.VITE_STORAGE_USER
  );
  // console.log("loggedUserJSON", loggedUserJSON);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    const token = user.token;
    // console.log("TOKEN", token);
    return token;
  }

  return null;
};

export default getToken;
