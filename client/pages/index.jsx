import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Header, Footer } from "@/components/layout";
import { animes } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "@/context/ContextProvider";

const Slider = (props) => (
  <div
    className="h-96 bg-gray-100 rounded-lg my-4 overflow-hidden
   flex items-center justify-center relative 
   transition duration-700 ease-linear"
  >
    <div className="w-full flex justify-around items-center ">
      {props.items.slice(props.pos, props.pos + 5).map((item, index) => (
        <div
          className={`flex flex-col items-center rounded-lg scale-90 opacity-75 hover:scale-100 hover:opacity-100
          transition duration-500 ease-linear group`}
          key={index}
        >
          <div className="relative w-40 h-64 hover:drop-shadow-2xl shadow-lg shadow-yellow-500 rounded-lg">
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
            className="group-hover:font-bold group-hover:text-yellow-400 group-hover:drop-shadow-xl group-hover:drop-shadow-yellow-400
             w-40 whitespace-nowrap overflow-hidden text-ellipsis text-center"
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
    <div
      className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl
     text-gray-400 w-12 h-12 rounded-full bg-slate-200 
     flex justify-center items-center"
      onClick={props.handleDecIndex}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </div>
    <div
      className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl
     text-gray-400 w-12 h-12 rounded-full bg-slate-200
     flex justify-center items-center"
      onClick={props.handleIncIndex}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </div>
  </div>
);

const index = () => {
  const { indexAnime, setIndexAnime } = useStateContext();

  const handleIncIndex = () => {
    setIndexAnime((prev) =>
      prev <= Math.ceil(animes.length / 5)
        ? ++prev
        : Math.ceil(animes.length / 5)
    );
  };

  const handleDecIndex = () => {
    setIndexAnime((prev) => (prev > 0 ? --prev : 0));
  };

  return (
    <div>
      <Header />
      <div className="mx-auto lg:w-4/5 min-h-screen">
        <div className="font-medium text-gray-400 mt-4">Nổi bật</div>
        <Slider
          items={animes}
          pos={indexAnime}
          handleIncIndex={handleIncIndex}
          handleDecIndex={handleDecIndex}
        />
        <div className="font-medium text-gray-400 mb-4">Mới cập nhật</div>
        <Slider
          items={animes.sort()}
          pos={indexAnime}
          handleIncIndex={handleIncIndex}
          handleDecIndex={handleDecIndex}
        />
      </div>
      <Footer />
    </div>
  );
};

export default index;
