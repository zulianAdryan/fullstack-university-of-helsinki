const isHasSession = () => {
  const loggedUserJSON = window.localStorage.getItem(
    import.meta.env.VITE_STORAGE_USER
  );
  // console.log({ loggedUserJSON, env: import.meta.env.VITE_STORAGE_USER });
  return loggedUserJSON ? true : false;
};

export default isHasSession;
