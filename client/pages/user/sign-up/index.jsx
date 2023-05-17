import React, { useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
const InputCustom = ({ name }) => {
  const id = useId();

  return (
    <div className="relative my-4 w-3/4 h-10 text-center ">
      <input
        type="text"
        id={id}
        className=" w-full h-10 px-2 py-5 bg-transparent rounded-lg outline-none transition duration-500 ease-linear border-2 border-white text-white border-t-0 placeholder-shown:border-t-2 focus-within:border-4 focus-within:border-t-0 focus-within:border-lime-500 peer "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="text-white cursor-text italic -translate-y-1/2 px-3 absolute h-full left-4 top-0 flex items-center transition duration-300 ease-linear peer-placeholder-shown:translate-y-0  "
      >
        {name}
      </label>
    </div>
  );
};

const index = () => {
  return (
    <div className="min-h-screen w-full dark:text-lime-200 flex  items-center justify-center">
      <div className="w-[30rem] h-[30rem] dark:bg-lime-400 rounded-full flex flex-col items-center justify-center">
        <div className="text-white text-3xl outline outline-white w-12 h-12 flex items-center justify-center rounded-full my-4">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <InputCustom name={"Username"} />
        <InputCustom name={"Password"} />
        <InputCustom name={"Confirm password"} />
        <div className="w-1/3 h-14 bg-white mt-4 dark:text-lime-500 flex items-center justify-center rounded-full hover:opacity-90 cursor-pointer">
          <div className="font-semibold">Sign Up</div>
        </div>
      </div>
    </div>
  );
};

export default index;
