import React, { useContext } from "react";
import { AuthContent } from "../contexts/Authcontext";
import { Navigate, useLocation } from "react-router-dom"; // ✅ should use react-router-dom

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContent);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace={true} />;
  }
  return children;
};

export default PrivateRoute;
