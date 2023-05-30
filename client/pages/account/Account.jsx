import React from "react";
import { faUser, faLock, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { account } from "../data";
import Link from "next/link";

const Account = ({ children }) => {
  return (
    <div className="md:mx-auto w-full md:w-11/12  min-h-screen bg-slate-100/50 dark:bg-slate-200/90 flex flex-col sm:flex-row">
      <div className="basis-1/5 flex sm:flex-col bg-yellow-500/40 dark:bg-lime-200">
        <div className="text-2xl basis-1/3 sm:basis-0 bg-yellow-500 dark:bg-lime-400 py-4 flex flex-col justify-center items-center transition duration-200 ease-linear">
          <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center text-yellow-500 dark:text-lime-400 transition duration-200 ease-linear">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="text-center text-white">abc</div>
        </div>
        <div className="basis-2/3 h-[8rem] sm:min-h-0 sm:basis-0 overflow-y-scroll sm:overflow-y-visible">
          {account.map((item, index) => {
            return (
              <Link href={item.link} className="w-full">
                <div
                  key={index}
                  className="flex items-center p-5 bg-yellow-600 dark:bg-lime-500 text-white hover:bg-yellow-600/50 dark:hover:bg-lime-500/50 cursor-pointer transition duration-200 ease-linear"
                >
                  <div className="mr-3">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div className="">{item.name}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="basis-4/5">
        <div className="w-full h-10 sm:block hidden bg-yellow-500 dark:bg-lime-400 transition duration-200 ease-linear"></div>
        {children}
      </div>
    </div>
  );
};

export default Account;
