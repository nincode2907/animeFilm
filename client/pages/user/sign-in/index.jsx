"use client";

import React, { useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const InputCustom = (prop) => {
  const id = useId();

  return (
    <div className="relative my-4 w-3/4 h-10 text-center ">
      <input
        id={id}
        className=" w-full h-10 px-2 py-5 bg-transparent rounded-lg outline-none transition duration-500 ease-linear border-2 border-white text-white border-t-0 placeholder-shown:border-t-2 focus-within:border-4 focus-within:border-t-0 dark:focus-within:border-lime-500 focus-within:border-yellow-500 peer "
        placeholder=" "
        type={prop.type}
        required={prop.required}
      />
      <label
        htmlFor={id}
        className="text-white cursor-text italic -translate-y-2/3 px-3 absolute h-full left-4 top-0 flex items-center transition duration-300 ease-linear peer-placeholder-shown:translate-y-0  "
      >
        {prop.name}
      </label>
    </div>
  );
};

const index = () => {
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
        <InputCustom name={"Username"} type={"text"} required />
        <InputCustom name={"Password"} type={"password"} />
        <div className="w-1/3 h-14 bg-white my-4 dark:text-lime-500 text-yellow-500 flex items-center justify-center rounded-full hover:opacity-90 cursor-pointer">
          <button type="submit" className="font-semibold">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default index;
