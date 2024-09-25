
import avatar from '../assets/avatar.jpg'

import { IoMdSunny } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DarkToggle from "./DarkModeToggle";
import { SearchStore } from "../context/SearchProvider";
import { UserStore } from "../context/userprovider";
import { useCookies } from "react-cookie";
import axios from "../utils/axios";

// Import Axios

const Navbar = () => {
  const { search, setSearch } = useContext(SearchStore);
  const {user, setUser} = useContext(UserStore); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  // Check if user is logged in and fetch user data

  useEffect(() => {

      axios
        .get("auth/user")
        .then((response) => {
          setUser(response.data.user); // Assuming response contains user data
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after API call
        });
  
  }, []);

  // Logout function
  const handleLogout = () => {
       axios
         .delete("auth/logout")
         .then(() => {
           setUser(null); // Clear user state
           // Assuming response contains user data
         })
         .catch((error) => {
           console.error("Error fetching user data", error);
         })
         .finally(() => {
           setLoading(false); // Set loading to false after API call
         });
  };

  return (
    <nav className="bg-light-background dark:bg-dark-background p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-light-text dark:text-dark-text text-lg font-bold"
        >
          NewsApp
        </NavLink>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          className="p-2 text-light-text dark:text-dark-text rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" text-3xl font-extrabold text-light-text dark:text-dark-text md:hidden focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navbar links */}
        <div className={`hidden md:flex md:items-center md:space-x-4`}>
          {loading ? (
            <span className="text-light-text dark:text-dark-text">
              Loading...
            </span>
          ) : user ? (
            <>
              <span className="text-light-text dark:text-dark-text mr-4">
                {user.name}
              </span>
              <img
                src={avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <button
                className="text-light-text dark:text-dark-text py-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-light-text dark:text-dark-text px-4"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-light-text dark:text-dark-text px-4"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="absolute z-10 top-16 left-0 w-full h-full bg-light-background dark:bg-dark-background shadow-lg rounded-lg md:hidden">
            <div className="flex flex-col items-center p-4">
              {loading ? (
                <span className="text-light-text dark:text-dark-text">
                  Loading...
                </span>
              ) : user ? (
                <>
                  <span className="text-light-text dark:text-dark-text mb-2">
                    {user.name}
                  </span>
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full my-2"
                  />
                  <button
                    className="text-light-text dark:text-dark-text py-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-light-text dark:text-dark-text py-2"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-light-text dark:text-dark-text py-2"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}


        <DarkToggle />
      </div>
    </nav>
  );
};

export default Navbar;

