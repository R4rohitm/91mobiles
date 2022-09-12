import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRoutes = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("user"));
  let token;
  if (data) {
    token = data.token;
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return token ? children : null;
};

export default AuthRoutes;
