import React, { Fragment } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const NextAndPrev = (props) => {
  const prevSlice = () => {
    const isValid = props.indexSlice < 1;
    const prev = isValid
      ? Math.floor(category.length / 5) - 1
      : props.indexSlice - 1;
    props.setIndexSlice(prev);
  };

  const nextSlice = () => {
    const isValid = props.indexSlice < Math.floor(category.length / 5) - 1;
    const next = isValid ? props.indexSlice + 1 : 0;
    props.setIndexSlice(next);
  };

  return (
    <Fragment>
      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 duration-500 text-2xl text-white dark:text-lime-200 w-12 h-12 rounded-full hover:text-orange-400 hover:bg-stone-700 bg-orange-400 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
        onClick={() => prevSlice()}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 duration-500 text-2xl text-white dark:text-lime-200 w-12 h-12 rounded-full hover:text-orange-400 hover:bg-stone-700 bg-orange-400  dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
        onClick={() => nextSlice()}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </Fragment>
  );
};

export default NextAndPrev;
