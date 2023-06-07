import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { animes } from "./data";
import { SlideShow } from "@/components/Sections";
import Link from "next/link";

const index = () => {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetch("http://localhost:8000/api/film")
  //       .then((res) => res.json())
  //       .then((json) => setData(json));
  //   }, []);

  return (
    <div>
      <div className="mx-auto lg:w-4/5 min-h-screen z-0 relative">
        <div className="font-medium transition duration-300 ease-in text-slate-50 bg-amber-400 mt-4 dark:text-gray-500 pl-4 py-2 drop-shadow-xl w-full dark:bg-lime-300">
          Nổi bật
        </div>
        <SlideShow
          size={4}
          items={animes.sort((a, b) => (a.rating - b.rating) * 1)}
        />
        <div className="font-medium transition duration-300 ease-in text-slate-50 bg-amber-400 mb-4 dark:text-gray-500 pl-4 py-2 drop-shadow-xl w-full dark:bg-lime-300">
          Mới cập nhật
        </div>
        <div className="bg-gray-300/50 rounded-lg sm:px-4 py-4">
          {animes
            .sort((a, b) => {
              a = a.release.split("/").reverse().join("");
              b = b.release.split("/").reverse().join("");
              return a > b ? 1 : a < b ? -1 : 0;
            })
            .map((item, index) => {
              return (
                <Link href={`/anime/${item.name}`}>
                  <div className="inline-block w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 drop-shadow-lg group ">
                    <div className="flex flex-col justify-center items-center">
                      <div
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                        className="w-40 h-64 relative bg-cover rounded-md opacity-75 group-hover:opacity-100 duration-500 drop-shadow-xl "
                      >
                        <div className="absolute w-12 h-12 top-2 right-2 rounded-full flex justify-center items-center bg-amber-500">
                          <div className="text-white font-medium">
                            {item.rating}
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 rounded-md p-1 flex flex-col justify-center items-center text-white bg-amber-500">
                          <FontAwesomeIcon
                            icon={faFilm}
                            className="mr-2 text-center font-medium"
                          />
                          <div className=" font-medium">
                            {item.currentEpisodes.length /
                              item.totalEpisodes ===
                            1
                              ? "Hoàn thành"
                              : item.currentEpisodes.length +
                                "/" +
                                item.totalEpisodes}
                          </div>
                        </div>
                      </div>
                      <div className="w-40 text-amber-600 dark:text-lime-400 group-hover:text-orange-500 dark:group-hover:text-lime-300 font-semibold text-center truncate">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default index;
