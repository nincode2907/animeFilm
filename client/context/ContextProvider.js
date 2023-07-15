import { useContext, createContext, useState, useEffect, useRef } from "react";
const StateProvider = createContext();

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [detailAnime, setDetailAnime] = useState({});
  const [isSignIn, setIsSignIn] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [addPlaylist, setAddPlaylist] = useState(false);
  const [video, setVideo] = useState("");
  const [data, setData] = useState([]);
  const [idFilm, setIdFilm] = useState();
  //   useEffect(() => {
  //     fetch("http://localhost:8000/api/film")
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setData(json);
  //       });
  //   }, []);

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
        isSignIn,
        setIsSignIn,
        playlist,
        setPlaylist,
        addPlaylist,
        setAddPlaylist,
        video,
        setVideo,
        data,
        setData,
        idFilm,
        setIdFilm,
      }}
    >
      {children}
    </StateProvider.Provider>
  );
};

export const useStateContext = () => useContext(StateProvider);

export default ContextProvider;
