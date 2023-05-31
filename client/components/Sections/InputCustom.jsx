import React, { forwardRef, useEffect, useRef } from "react";
import { useId } from "react";
const InputCustom = forwardRef(function InputCustom(prop, ref) {
  const id = useId();

  return (
    <div className="relative my-4 w-3/4 h-10 text-center ">
      <input
        id={id}
        className=" w-full h-10 px-2 py-5 bg-transparent rounded-lg outline-none transition duration-500 ease-linear border-2 border-white text-white border-t-0 placeholder-shown:border-t-2 focus-within:border-4 focus-within:border-t-0 dark:focus-within:border-lime-500 focus-within:border-yellow-500 peer "
        placeholder=" "
        type={prop.type}
        required={prop.required}
        ref={ref}
      />
      <label
        htmlFor={id}
        className="text-white cursor-text italic -translate-y-2/3 px-3 absolute h-full left-4 top-0 flex items-center transition duration-300 ease-linear peer-placeholder-shown:translate-y-0  "
      >
        {prop.name}
      </label>
    </div>
  );
});

export default InputCustom;
