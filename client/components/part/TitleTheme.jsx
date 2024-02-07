import React from "react";

const TitleTheme = (props) => {
  return (
    <div className="font-medium transition duration-300 ease-in text-orange-400 rounded-tr-full rounded-br-full bg-stone-700 mb-4 dark:text-white pl-4 py-2 drop-shadow-xl w-full dark:bg-lime-400">
      {props.title}
    </div>
  );
};

export default TitleTheme;
