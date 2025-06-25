import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContent } from "../../contexts/Authcontext";
import { NavLink } from "react-router";
import "./Header.css";
import { FileUser, LogOut, Pencil, UserRoundPlus } from "lucide-react";
const UserProfileIcon = () => {
  const { user, handelLogOut } = useContext(AuthContent);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  return (
    <div>
      {user && user.email && (
        <div className="md:flex gap-4 items-center capitalize">
          <div className="user-profile-dowpdown-menu">
            <div className="md:relative inline-block">
              {/* profile icon || triger button */}

              <button
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex cursor-pointer items-center text-left rounded-full ring-2 transition duration-200 ease-in-out
    ${dropdownOpen ? "ring-green-600 dark:ring-green-400" : "ring-gray-300 dark:ring-gray-600"}
    hover:ring-green-500 dark:hover:ring-green-400
    focus:ring-green-500 dark:focus:ring-green-400
    active:ring-green-700 dark:active:ring-green-600
  `}
              >
                <div
                  className={`h-[30px] w-[30px] md:w-[40px] md:h-[40px] mt-[1px] rounded-full bg-amber-600 text-white flex items-center justify-center font-bold uppercase ring-2 transition
      ${dropdownOpen ? "ring-green-600 dark:ring-green-400" : "ring-gray-300 dark:ring-gray-600"}
      hover:ring-green-500 dark:hover:ring-green-400
      focus:ring-green-500 dark:focus:ring-green-400
      active:ring-green-700 dark:active:ring-green-600
    `}
                >
                  {user?.photoURL ? (
                    <div className="relative w-full h-full">
                      <img src={user.photoURL} className="h-full w-full rounded-full object-cover object-center" />
                      <span className="absolute -right-0.5 -top-0.5 block h-[14px] w-[14px] rounded-full border-[2.3px] border-white bg-[#219653] dark:border-dark"></span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "?"}
                      <span className="absolute -right-0.5 -top-0.5 block h-[14px] w-[14px] rounded-full border-[2.3px] border-white bg-[#219653] dark:border-dark"></span>
                    </div>
                  )}
                </div>
              </button>

              {/* dropdown menu  */}
              <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 top-full  md:mt-2.5 z-40 w-full  md:w-[250px] space-y-1 md:rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-white  drop-shadow-xl border border-gray-200 ${
                  dropdownOpen ? "block" : "hidden"
                }`}
              >
                <div className="dropdown-content overflow-hidden">
                  <div className="content-top py-1 px-3 flex gap-2 border-b-1 pb-4 mb-5 border-b-gray-500 dark:border-b-gray-700">
                    {/* display login user name  */}
                    <span>
                      <small className="text-gray-800 dark:text-gray-400">You Sign In as</small> <br />
                      <span className="text-black dark:text-gray-200"> {user.displayName}</span>
                    </span>
                  </div>
                  <div className="drop_menu  px-3 my-2.5 pb-1 ">
                    <ul className="space-y-1.5 user-drop-menu  flex flex-col gap-1">
                      <li className="text-black dark:text-gray-200">
                        <NavLink className={"flex gap-2 items-center"} to="/add-gardener">
                          <UserRoundPlus size={15} /> <span>Add Gardener</span>
                        </NavLink>
                      </li>

                      <li className="text-black dark:text-gray-200 flex gap-2 items-center">
                        <NavLink to="/share-tips" className={"flex gap-2 items-center"}>
                          {" "}
                          <Pencil size={15} />
                          <span>Share Tips</span>
                        </NavLink>
                      </li>
                      <li className="text-black dark:text-gray-200 flex gap-2 items-center">
                        <NavLink to="/my-tips" className={"flex gap-2 items-center"}>
                          {" "}
                          <FileUser size={15} />
                          <span>My Tips</span>
                        </NavLink>
                      </li>
                      <li>
                        <button onClick={handelLogOut} className="flex items-center gap-2 cursor-pointer capitalize text-black dark:text-gray-200">
                          <LogOut size={15} />
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileIcon;
