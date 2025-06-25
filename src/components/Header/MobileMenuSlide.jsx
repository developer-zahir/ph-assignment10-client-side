import React, { useContext } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import MenuLinks from "./MenuLinks";
import LoginRegisterButton from "./LoginRegisterButton";
import { AuthContent } from "../../contexts/Authcontext";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const MobileMenuSlide = ({ isOpen }) => {
  const {user} = useContext(AuthContent)
  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 z-10 h-[100dvh] w-[75%] md:w-[40%] bg-white dark:bg-gray-800 block lg:hidden"
    >
      <aside className="flex flex-col justify-between h-full">
       <div className="top">
       <div className="border-b-1 border-b-gray-200 dark:border-b-gray-700 py-4 px-2">
           <div className="logo hover:opacity-85">
            <NavLink to="/">
              <div className="lgo flex gap-2 items-center">
                <Leaf className="text-green-600 dark:text-green-500  scale-80 md:scale-100" size={40} />
                <span className="text-xl md:text-2xl font-medium text-green-700 dark:text-white">GardenHub</span>
              </div>
            </NavLink>
          </div>
        </div>
        <ul className="flex flex-col gap-3 pl-4 pt-5 dark:text-white">
          <MenuLinks></MenuLinks>
        </ul>
       </div>
      </aside>
    </motion.aside>
  );
};

export default MobileMenuSlide;
