import { useState, useEffect } from "react";
import { IoMdSunny } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useContext } from "react";
import { ThemeStore } from "../context/ThemeProvider";
const DarkToggle = () => {
  const { theme, setTheme } = useContext(ThemeStore);

  const toggleTheme = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed left-2 bottom-4 p-2 z-30 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center"
    >
      {theme === "light" ? (
        <IoMdSunny className="w-6 h-6 text-yellow-500" />
      ) : (
        <BsFillMoonStarsFill className="w-6 h-6 text-gray-900 dark:text-gray-300" />
      )}
    </button>
  );
};

export default DarkToggle;
