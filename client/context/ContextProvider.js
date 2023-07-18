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
  const [video, setVideo] = useState(1);
  const [data, setData] = useState([]);
  const [idFilm, setIdFilm] = useState();
  const [episodes, setEpisodes] = useState([]);

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
        episodes,
        setEpisodes,
      }}
    >
      {children}
    </StateProvider.Provider>
  );
};

export const useStateContext = () => useContext(StateProvider);

export default ContextProvider;
