import React from "react";
import { FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoLinkedin } from "react-icons/io";
import { NavLink } from "react-router";
import "./Footer.css";
import { IoCall, IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-green-700 dark:bg-gray-800 pt-10 pb-2">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 md:py-6 flex flex-col  text-sm md:text-base text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center ">
              <div className="logo hover:opacity-85 mb-4">
                <NavLink to="/">
                  <div className="lgo flex gap-2 items-center">
                    <Leaf className="text-white  scale-80 md:scale-100" size={40} />
                    <span className="text-xl md:text-2xl font-medium text-white">GardenHub</span>
                  </div>
                </NavLink>
              </div>
            </div>
            <p className="text-white mb-6">A community for garden enthusiasts to connect, share knowledge, and grow together.</p>
            <div className="flex space-x-4">
              <a href="#" className=" dark:text-gray-400 transition-colors">
                <FaFacebookSquare className="hover:text-green-500" size={20} />
              </a>
              <a href="#" className=" dark:text-gray-400  transition-colors">
                <FaTwitter className="hover:text-green-500" size={20} />
              </a>
              <a href="#" className=" dark:text-gray-400   transition-colors">
                <FiInstagram className="hover:text-green-500" size={20} />
              </a>
              <a href="#" className=" dark:text-gray-400  transition-colors">
                <IoLogoLinkedin className="hover:text-green-500" size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-3 border-l-red-500 pl-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li className="text-white-400">Home</li>
              <li className="text-white-400">Explore Gardeners</li>
              <li className="text-white-400">Browse Tips</li>
              <li className="text-white-400">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-3 border-l-red-500 pl-3 text-white">Categories</h3>
            <ul className="space-y-2">
              <li className="text-white">Composting</li>
              <li className="text-white">Plant Care</li>
              <li className="text-white">Vertical Gardening</li>
              <li className="text-white">Hydroponics</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-3 border-l-red-500 pl-3 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <IoLocationSharp className="text-white" />
                <span className="text-white">123 Garden Street, Green City, Earth</span>
              </li>
              <li className="flex items-center space-x-3">
                <IoCall className="text-white" />
                <span className="text-white">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MdEmail className="text-white" />
                <span className="text-white">contact@gardenhub.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-300 dark:border-gray-700 mt-15 pt-7 text-center text-whitetext-sm">
          <p>© 2025 GardenHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
