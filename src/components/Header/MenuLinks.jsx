import React from "react";
import { Link, NavLink } from "react-router";
import { HashLink } from 'react-router-hash-link';

const MenuLinks = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/all-gardeners">Explore Gardeners</NavLink>
      <NavLink to="/all-tips">Browse Tips</NavLink>
     
    </>
  );
};

export default MenuLinks;
