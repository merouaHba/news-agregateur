import {createContext,useState,useEffect} from 'react'
export const ThemeStore = createContext({})
const ThemeProvider = ({ children }) => {
       const [theme, setTheme] = useState(
         localStorage.getItem("theme")
       );
       const element = document.documentElement;
      
     
       useEffect(() => {
         switch (theme) {
           case "dark":
             element.classList.add("dark");
             localStorage.setItem("theme", "dark");
             break;
           case "light":
             element.classList.remove("dark");
             localStorage.setItem("theme", "light");
             break;

           default:
             element.classList.remove("dark");
             localStorage.setItem("theme", "light");
             break;
         }
       }, [theme]);
     

  return (
    <ThemeStore.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeStore.Provider>
  );
}

export default ThemeProvider