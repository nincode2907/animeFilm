import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { animes } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Slider = (props) => (
  <div className="h-96 bg-gray-100 dark:bg-neutral-500 rounded-lg my-4 overflow-hidden flex items-center justify-center relative dark:shadow-infull dark:shadow-lime-200">
    <div className="w-full flex justify-around items-center ">
      {props.items.slice(props.pos, props.pos + 5).map((item, index) => (
        <div
          className={`flex flex-col items-center rounded-lg scale-90 opacity-75 hover:scale-100 hover:opacity-100
          transition duration-500 ease-linear group`}
          key={index}
        >
          <div className="relative w-40 h-64 hover:drop-shadow-2xl shadow-full shadow-yellow-500 dark:shadow-lime-200 rounded-lg">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="rounded-lg"
            />
            <div className="absolute top-3 right-3 w-10 h-10 bg-gray-500/80 text-yellow-300/80 flex items-center justify-center rounded-full">
              {item.rating}
            </div>
          </div>
          <div
            className="dark:text-lime-200 group-hover:font-bold group-hover:text-yellow-400 group-hover:drop-shadow-xl group-hover:drop-shadow-yellow-400
             w-40 whitespace-nowrap overflow-hidden text-ellipsis text-center"
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
    <div
      className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl text-gray-400 dark:text-lime-200 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
      onClick={props.handleDecIndex}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </div>
    <div
      className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-gray-400 dark:text-lime-200 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
      onClick={props.handleIncIndex}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </div>
  </div>
);

const index = () => {
  const [indexAnime, setIndexAnime] = useState(0);
  const [indexAnime2, setIndexAnime2] = useState(0);

  const handleIncIndex = (setIndex) => {
    setIndex((prev) => (prev <= Math.ceil(animes.length / 5) ? ++prev : 0));
    console.log(indexAnime);
  };

  const handleDecIndex = (setIndex) => {
    setIndex((prev) => (prev > 0 ? --prev : Math.ceil(animes.length % 5)));
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="mx-auto lg:w-4/5 min-h-screen z-0 relative">
        <div className="font-medium text-gray-400 mt-4 dark:text-lime-200">
          Nổi bật
        </div>
        <Slider
          items={animes}
          pos={indexAnime}
          handleIncIndex={() => handleIncIndex(setIndexAnime)}
          handleDecIndex={() => handleDecIndex(setIndexAnime)}
        />
        <div className="font-medium text-gray-400 mb-4 dark:text-lime-200">
          Mới cập nhật
        </div>
        <Slider
          items={animes.sort()}
          pos={indexAnime2}
          handleIncIndex={() => handleIncIndex(setIndexAnime2)}
          handleDecIndex={() => handleDecIndex(setIndexAnime2)}
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default index;
