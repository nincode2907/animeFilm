import { useContext, createContext, useState } from "react";
const StateProvider = createContext();

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const  [activeMenu, setActiveMenu] = useState(false);
  const  [activeUser, setActiveUser] = useState(false);
  const [indexAnime, setIndexAnime] = useState(0);

  return (
    <StateProvider.Provider value={{
      theme,setTheme,
      activeMenu,setActiveMenu,
      activeUser,setActiveUser,
      indexAnime,setIndexAnime,
    }}>
    {children}
    </StateProvider.Provider>
  )
};

export const useStateContext = () => useContext(StateProvider);

export default ContextProvider;