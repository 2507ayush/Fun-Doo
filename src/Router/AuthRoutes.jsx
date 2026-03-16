import { Navigate } from "react-router-dom";

function AuthRoutes({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return user ? <Navigate to="/" /> : children;
}

export default AuthRoutes;