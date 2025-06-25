import React from "react";
import { NavLink } from "react-router";

const LoginRegisterButton = ({ className }) => {
  return (
    <>
      <NavLink
        to="/login"
        className={`${className} bg-green-600 text-white px-5 py-2 rounded font-medium transition pb-2.5 
        } `}
      >
        Login / Register
      </NavLink>
    </>
  );
};

export default LoginRegisterButton;
