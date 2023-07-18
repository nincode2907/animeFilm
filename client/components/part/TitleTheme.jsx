import React from "react";

const TitleTheme = (props) => {
  return (
    <div className="font-medium transition duration-300 ease-in text-slate-50 bg-yellow-400 mb-4 dark:text-gray-500 pl-4 py-2 drop-shadow-xl w-full dark:bg-lime-300">
      {props.title}
    </div>
  );
};

export default TitleTheme;
