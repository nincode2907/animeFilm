import React from "react";
import { pages, users } from "@/pages/data";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faAddressCard,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "@/context/ContextProvider";

const Header = () => {
  const { activeMenu, setActiveMenu, activeUser, setActiveUser } =
    useStateContext();

  return (
    <div className=" h-12 w-full drop-shadow-lg shadow-lg flex items-center justify-around ">
      <div
        className="text-2xl basis-1/4 text-center text-gray-400 hover:text-gray-600 cursor-pointer transition-all"
        onClick={() => setActiveMenu((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className=" text-2xl text-red-400 basis-2/4 text-center">AniAni</div>

      <div
        className={`${
          activeMenu
            ? "absolute top-full w-full flex justify-around py-4 bg-slate-50"
            : "hidden"
        }`}
      >
        {pages.map((page, index) => {
          return (
            <div className="text-gray-400 hover:text-gray-600" key={index}>
              <Link href={page.path}>{page.name}</Link>
            </div>
          );
        })}
      </div>

      <div className=" flex gap-4 basis-1/4 px-2 ">
        <div className="relative flex items-center focus-visible:text-gray-400">
          <input
            type="text"
            className="px-2 py-1 rounded-md border-none outline outline-1 outline-gray-300 focus-visible:outline-gray-400"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-0 mr-3 text-gray-300 "
          />
        </div>
        <div
          className=" w-7 h-7 rounded-full outline-1 outline-gray-400 outline flex justify-center items-center"
          onClick={() => setActiveUser((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-400 cursor-pointer hover:text-gray-500"
          />
          <div
            className={`${
              activeUser
                ? "absolute flex flex-col gap-3 right-2 top-full py-4 px-5 bg-slate-50 rounded-md text-gray-400"
                : "hidden"
            }`}
          >
            {users.map((user, index) => (
              <div className="w-36" key={index}>
                <Link href={user.path}>
                  <span className=" pr-3">
                    <FontAwesomeIcon icon={user.icon} />
                  </span>
                  {user.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
