import React, { useEffect, useState } from "react";
import { pages, users } from "@/pages/data";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faAddressCard,
  faRightToBracket,
  faSun,
  faMoon,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "@/context/ContextProvider";
import { userAccount } from "@/pages/data";

const SwitchButton = (props) => {
  return (
    <div className="relative flex items-center h-7 w-12 rounded-full">
      <input
        type="checkbox"
        name=""
        id="switch"
        className="h-7 w-12 appearance-none bg-gradient-to-l from-cyan-500 dark:from-violet-700 dark:bg-gradient-to-r rounded-full peer checked:bg-pink-500 transition duration-500"
        onChange={(e) => {
          localStorage.setItem("anime-mode", e.target.checked);
          const body = window.document.body.classList;
          const storage = JSON.parse(localStorage.getItem("anime-mode"));
          if (storage) {
            body.add("dark");
          } else {
            body.remove("dark");
          }
        }}
      />
      <label
        htmlFor="switch"
        className="absolute left-1 h-5 w-5 bg-gray-200 text-cyan-400 dark:text-black/40 dark:bg-white/70 rounded-full flex justify-center items-center peer-checked:translate-x-full transition duration-300 ease-linear cursor-pointer"
      >
        <FontAwesomeIcon icon={props.icon} />
      </label>
    </div>
  );
};

const Header = () => {
  const {
    activeMenu,
    setActiveMenu,
    activeUser,
    setActiveUser,
    isSignIn,
    setIsSignIn,
  } = useStateContext();

  return (
    <div className="box-border h-12 w-full drop-shadow-lg shadow-lg flex items-center justify-around z-20 relative dark:bg-neutral-500 dark:shadow-md dark:shadow-lime-200">
      {/* Icon Nav */}
      <div
        className=" basis-1/4 text-center text-gray-400 dark:text-lime-200 hover:text-gray-600 cursor-pointer transition-all"
        onClick={() => setActiveMenu((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </div>
      {/* Logo */}
      <Link href={"/"}>
        <div className="basis-2/4 drop-shadow-lg w-24 h-12">
          <Image src={"/assets/images/logo.png"} alt="OniAnime" fill />
        </div>
      </Link>
      {/* Navigation */}
      <div
        className={`${
          activeMenu
            ? "absolute top-full w-full flex justify-around py-4 bg-slate-50 dark:bg-neutral-500"
            : "hidden"
        }`}
      >
        {pages.map((page, index) => {
          return (
            <div
              className="text-gray-400 dark:text-lime-200 hover:text-gray-600 drop-shadow-lg dark:hover:text-orange-300"
              key={index}
            >
              <Link href={page.path}>{page.name}</Link>
            </div>
          );
        })}
      </div>
      {/* User */}
      <div className=" flex gap-4 h-full basis-1/4 px-2 ">
        <div className="relative flex gap-4 items-center">
          <div className="relative flex items-center">
            <input
              type="text"
              className="px-2 py-1 rounded-md border-none outline outline-2 outline-gray-300 focus-visible:outline-gray-400 peer dark:bg-slate-200 dark:focus-visible:outline-lime-400"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-0 mr-3 text-gray-300 dark:text-gray-400 peer-focus-within:text-gray-400 dark:peer-focus-within:text-gray-500  "
            />
          </div>
          <div className="w-7 h-7 rounded-full outline-1 outline-gray-400 dark:outline-lime-200 outline flex justify-center items-center">
            {isSignIn ? (
              <div className="w-5 h-5 scale-100 rounded-full">
                <Image src={userAccount.avatar} alt={userAccount.name} fill />
              </div>
            ) : (
              <FontAwesomeIcon
                onClick={() => setActiveUser((prev) => !prev)}
                icon={faUser}
                className="text-gray-400 dark:text-lime-200 cursor-pointer hover:text-gray-500 dark:hover:text-lime-400"
              />
            )}
            <div
              className={`${
                activeUser
                  ? "absolute flex flex-col gap-3 right-0 top-full py-4 px-5 bg-slate-50 dark:bg-neutral-500 dark:outline dark:outline-2 dark:outline-lime-200 rounded-md text-gray-400 z-20"
                  : "hidden"
              }`}
            >
              {/* Chỉnh isSignIn => !isSignIn để test */}
              {isSignIn ? (
                <>
                  <Link href={"/account/info"}>
                    <div className="w-36 dark:text-lime-200 hover:text-gray-600 dark:hover:text-lime-500 cursor-pointer">
                      <span className="pr-3">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      {userAccount.name}
                    </div>
                  </Link>
                  <Link href={"/playlist"}>
                    <div className="w-36 dark:text-lime-200 hover:text-gray-600 dark:hover:text-lime-500 cursor-pointer">
                      <span className="pr-3">
                        <FontAwesomeIcon icon={faListUl} />
                      </span>
                      Playlist
                    </div>
                  </Link>
                  <Link href={"/"}>
                    <div
                      onClick={() => setIsSignIn(false)}
                      className="w-36 dark:text-lime-200 hover:text-gray-600 dark:hover:text-lime-500 cursor-pointer"
                    >
                      <span className="pr-3">
                        <FontAwesomeIcon icon={faRightToBracket} />
                      </span>
                      Đăng xuất
                    </div>
                  </Link>
                </>
              ) : (
                users.map((user, index) => (
                  <div
                    className="w-36 dark:text-lime-200 hover:text-gray-600"
                    key={index}
                  >
                    <Link href={user.path}>
                      <span className=" pr-3">
                        <FontAwesomeIcon icon={user.icon} />
                      </span>
                      {user.name}
                    </Link>
                  </div>
                ))
              )}
              {/* Mode */}
              <div className="flex items-center">
                <SwitchButton icon={faSun} />
                <span className="pl-4 dark:text-lime-200">Chế độ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
