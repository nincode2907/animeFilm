"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { animes } from "@/pages/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlusSquare,
  faShare,
  faLightbulb,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useStateContext } from "@/context/ContextProvider";

const DynamicWatch = () => {
  const router = useRouter();
  const { ep, name } = router.query;
  const { video, setVideo } = useStateContext();
  const src = useRef();
  const data = useRef(animes.filter((item) => item.name === name)[0]);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    src.current.load();
  }, [video]);

  return (
    <div className="lg:mx-auto lg:w-3/4 w-full bg-slate-200 dark:bg-slate-50/50 min-h-screen mt-3">
      <div className="bg-amber-500 dark:bg-lime-500 text-white text-lg py-3 px-4">
        {name} - tập {ep}
      </div>
      <div className="flex flex-col sm:flex-row justify-center my-4">
        {/* film */}
        <div className="basis-3/4 sm:p-4">
          <div className="relative">
            <video className=" w-full bg-black rounded-md" controls ref={src}>
              <source
                src={video}
                className="w-full h-full min-h-24 md:max-h-[30rem] "
              />
            </video>
            <div
              className={` absolute ${
                play ? "hidden" : "flex"
              } justify-center items-center top-0 bottom-0 right-0 left-0 bg-black rounded-md`}
            >
              <div
                onClick={() => setPlay(true)}
                className="rounded-full border-2 cursor-pointer text-2xl border-white text-red-500 w-20 h-20 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPlay} />
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xl text-white bg-amber-500 dark:bg-lime-500 h-10 rounded-md">
            <div className=" flex gap-4 ml-4 cursor-pointer">
              <FontAwesomeIcon icon={faHeart} className="hover:text-gray-400" />
              <FontAwesomeIcon
                icon={faPlusSquare}
                className="hover:text-gray-400"
              />
              <FontAwesomeIcon icon={faShare} className="hover:text-gray-400" />
            </div>
            <div className=" flex gap-4 mr-4 cursor-pointer">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="hover:text-gray-400"
              />
            </div>
          </div>
        </div>
        {/* episode */}
        <div className="basis-1/4">
          <div className="bg-amber-500 dark:bg-lime-500 text-white py-3 mt-4 sm:mt-0 text-lg pl-4 sm:rounded-tl-full sm:rounded-bl-full  ">
            Các tập khác
          </div>
          {data.current.currentEpisodes.map((item, index) => {
            return (
              <Link href={`/anime/${name}/episode/${item.epsisode.toString()}`}>
                <div
                  key={index}
                  onClick={() => setVideo(item.video)}
                  className={`inline-block ${
                    index === ep - 1
                      ? "bg-lime-500 dark:bg-amber-500"
                      : "bg-amber-500 dark:bg-lime-500"
                  } text-white font-semibold hover:opacity-60 cursor-pointer my-3 ml-3 w-1/6 sm:w-1/3  text-center py-2 rounded-md`}
                >
                  {item.epsisode}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DynamicWatch;
