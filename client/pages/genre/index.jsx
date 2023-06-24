"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { allGenre, animes } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Genre = () => {
  const [type, setType] = useState("All");
  const [indexSlice, setIndexSlice] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/api/category")
      .then((res) => res.json())
      .then((dataFetch) => console.log(dataFetch));
    fetch("http://localhost:8000/api/film")
      .then((res) => res.json())
      .then((dataFetch) => console.log(dataFetch));
  }, []);

  const prevSlice = () => {
    const isValid = indexSlice < 1;
    const prev = isValid ? Math.floor(allGenre.length / 5) : indexSlice - 1;
    setIndexSlice(prev);
  };

  const nextSlice = () => {
    const isValid = indexSlice < Math.floor(allGenre.length / 5);
    const next = isValid ? indexSlice + 1 : 0;
    setIndexSlice(next);
  };

  return (
    <div className="xl:mx-auto xl:w-4/5 w-full drop-shadow-lg box-border min-h-screen">
      <div className="min-h-fit my-4 rounded-lg flex flex-col sm:flex-row justify-center gap-4 relative">
        {/* need Optimize */}
        {allGenre
          .slice(indexSlice * 5, indexSlice * 5 + 5)
          .map((item, index) => (
            <div
              className="flex items-center justify-center cursor-pointer rounded-md text-white px-4 py-3 bg-yellow-500 dark:bg-lime-400 hover:opacity-80"
              key={index}
              onClick={() => setType(item)}
            >
              <div className="text-center">{item}</div>
            </div>
          ))}
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 duration-500 text-2xl text-white dark:text-lime-200 w-12 h-12 rounded-full bg-amber-400 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
          onClick={() => prevSlice()}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 duration-500 text-2xl text-white dark:text-lime-200 w-12 h-12 rounded-full bg-amber-400 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
          onClick={() => nextSlice()}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className="text-white flex items-center justify-center my-4 cursor-pointer hover:opacity-90">
        <div
          className="bg-red-500 px-6 py-2 rounded-lg"
          onClick={() => setType("All")}
        >
          Tất cả
        </div>
      </div>
      <div className="shadow-infull dark:shadow-lime-200 dark:bg-transparent bg-slate-100 shadow-yellow-500 rounded-lg mb-4 py-4">
        {animes.some((anime) => anime.genres.includes(type)) ? (
          animes.map((item, index) => {
            if (item.genres.includes(type)) {
              return (
                <Link
                  href={`/anime/${item.name}`}
                  className="inline-block w-1/2 sm:w-1/4 md:w-1/5 xl:w-1/6 text-center p-4"
                >
                  <div
                    className="flex flex-col items-center drop-shadow-xl sm:justify-center rounded-lg transition duration-500 ease-linear group w-full min-h-[15rem] relative"
                    key={index}
                  >
                    <div className="relative min-h-fit w-40 h-64 rounded-lg cursor-pointer">
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
                      className="dark:text-lime-200 group-hover:font-bold group-hover:text-red-600 dark:group-hover:text-yellow-500  group-hover:drop-shadow-xl 
                                  w-40 whitespace-nowrap overflow-hidden text-ellipsis text-center mt-2
                                  "
                    >
                      {item.name}
                    </div>
                  </div>
                </Link>
              );
            }
          })
        ) : (
          <div className="text-center dark:text-lime-200">
            Hiện chưa cập nhật anime thuộc thể loại này
          </div>
        )}
      </div>
    </div>
  );
};

export default Genre;
