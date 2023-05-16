import { useContext, createContext, useState, useEffect } from "react";
const StateProvider = createContext();

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [detailAnime, setDetailAnime] = useState({});

  useEffect(() => {
    if (localStorage.getItem("anime-mode") === null) {
      localStorage.setItem("anime-mode", false);
    } else {
      const body = window.document.body.classList;
      const input = document.getElementById("switch");
      const storage = JSON.parse(localStorage.getItem("anime-mode"));
      if (storage) {
        body.add("dark");
        input.checked = true;
      } else {
        body.remove("dark");
      }
    }
  }, []);

  return (
    <StateProvider.Provider
      value={{
        theme,
        setTheme,
        activeMenu,
        setActiveMenu,
        activeUser,
        setActiveUser,
        darkMode,
        setDarkMode,
        detailAnime,
        setDetailAnime,
      }}
    >
      {children}
    </StateProvider.Provider>
  );
};

export const useStateContext = () => useContext(StateProvider);

export default ContextProvider;
