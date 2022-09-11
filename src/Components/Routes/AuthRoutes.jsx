const AuthRoutes = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("user"));

  return data.token ? children : null;
};

export default AuthRoutes;
