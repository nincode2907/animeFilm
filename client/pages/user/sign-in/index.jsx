"use client";

import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { InputCustom } from "@/components/Sections";
import { userAccount } from "@/pages/data";
import Link from "next/link";
import { useStateContext } from "@/context/ContextProvider";

const index = () => {
  const username = useRef();
  const password = useRef();
  const { setIsSignIn } = useStateContext();

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <form
        action=""
        method="post"
        className="w-full min-h-96 md:w-[30rem] md:h-[30rem] dark:bg-lime-400 bg-yellow-600 md:rounded-full flex flex-col items-center justify-center"
      >
        <Link href="/user/sign-up">
          <div className="text-5xl text-white text-center cursor-pointer my-4">
            <FontAwesomeIcon
              icon={faAngleUp}
              className="hover:bg-slate-200/30 py-4 px-5 rounded-full"
            />
          </div>
        </Link>
        <div className="text-white text-3xl outline outline-white w-12 h-12 flex items-center justify-center rounded-full my-4">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <InputCustom name={"Username"} type={"text"} required ref={username} />
        <InputCustom name={"Password"} type={"password"} ref={password} />
        <div className="w-1/3 h-14 bg-white my-4 dark:text-lime-500 text-yellow-500 flex items-center justify-center rounded-full hover:opacity-90 cursor-pointer">
          <div
            //   type="submit"
            className="font-semibold"
            onClick={() => {
              if (
                username.current.value === userAccount.name &&
                password.current.value === userAccount.password
              ) {
                setIsSignIn(true);
                //       document.location.href = "/";
              }
            }}
          >
            Sign In
          </div>
        </div>
      </form>
    </div>
  );
};

export default index;
