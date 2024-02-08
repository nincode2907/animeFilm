import React, { useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { InputCustom } from "@/components/Sections";
import Link from "next/link";

const index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <form
        action=""
        method="post"
        className="relative w-full min-h-full md:w-[35rem] md:min-h-[35rem] dark:bg-lime-400 bg-stone-700 lg:rounded-full flex flex-col items-center justify-center"
      >
        <div className="text-orange-400 dark:text-stone-700 text-3xl mt-4 outline outline-orange-400 dark:outline-stone-700 w-12 h-12 flex items-center justify-center rounded-full my-4">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <InputCustom name={"Username"} type={"text"} required />
        <InputCustom name={"Password"} type={"password"} required />
        <InputCustom name={"Confirm password"} type={"password"} required />
        <div className="w-1/3 h-14 bg-stone-700 mt-4 dark:text-lime-200 text-orange-400 outline outline-orange-400 dark:outline-stone-700 flex items-center justify-center rounded-full hover:opacity-80 cursor-pointer">
          <button type="submit" className="font-semibold">
            Sign Up
          </button>
        </div>
        <Link href="/user/sign-in">
          <div className=" text-5xl text-orange-400 dark:text-stone-700 text-center my-4 cursor-pointer ">
            <FontAwesomeIcon
              icon={faAngleDown}
              className="hover:bg-slate-200/30 py-2 px-3 rounded-full"
            />
          </div>
        </Link>
      </form>
    </div>
  );
};

export default index;
