import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router";
import MobileMenuSlide from "./MobileMenuSlide";
import { AnimatePresence } from "framer-motion";
import MenuLinks from "./MenuLinks";
import "./Header.css";
import LoginRegisterButton from "./LoginRegisterButton";
import { AuthContent } from "../../contexts/Authcontext";
import UserProfileIcon from "./UserProfileIcon";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { Leaf, TreePalm } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useContext(AuthContent);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // if (loading) {
  //   return <header className="sticky top-0 z-50 dark:bg-gray-800 bg-white shadow h-16"></header>;
  // }

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-gray-800  shadow transition-all duration-300 ${isScrolled ? "py-2  md:py-4" : "py-5"}`}>
      <div className="relative max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 justify-between items-center py-0.5 px-2 md:px-2 md:py-0">
        <div className="left flex items-center gap-7 md:col-span-2">
          <div className="logo hover:opacity-85">
            <NavLink to="/">
              <div className="lgo flex gap-2 items-center">
                <Leaf className="text-green-600 dark:text-green-500  scale-80 md:scale-100" size={40} />
                <span className="text-xl md:text-2xl font-medium text-green-700 dark:text-white">GardenHub</span>
              </div>
            </NavLink>
          </div>
          <ul className="hidden lg:flex gap-10 dark:text-white text-black  font-normal text-center">
            <MenuLinks />
          </ul>
        </div>

        <div className="right flex flex-row-reverse md:flex-row items-center justify-start md:justify-end gap-3">
          {/* mobile menu icon */}
          <div className="block lg:hidden text-2xl cursor-pointer text-black dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <AiOutlineClose size={26} className="text-green-600 " /> : <AiOutlineMenu size={26} className="hover:text-green-500" />}
          </div>
          <AnimatePresence>{isOpen && <MobileMenuSlide isOpen={isOpen} />}</AnimatePresence>

          {!user ? (
            <div className="hidden md:flex gap-4 ">
              <LoginRegisterButton />
            </div>
          ) : (
            <div className="mt-1">
              <UserProfileIcon />
            </div>
          )}
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </div>
    </header>
  );
};

export default Header;
