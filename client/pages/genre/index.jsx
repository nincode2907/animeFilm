"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { allGenre, animes } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";

const Genre = () => {
  const [type, setType] = useState("All");
  const { setIdFilm, data } = useStateContext();
  const [indexSlice, setIndexSlice] = useState(0);
  const [category, setCategory] = useState([]);
  const [pagination, setPagination] = useState(0);
  const indexPagination = [];
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8000/api/category")
      .then((res) => res.json())
      .then((dataFetch) => setCategory(dataFetch));
  }, [router.asPath]);

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

  (function () {
    const length = data.length / 6;
    for (let index = 0; index < length; index++) {
      indexPagination.push(
        <div
          key={index}
          onClick={() => setPagination(index)}
          className="w-7 h-7 bg-yellow-400 text-white flex items-center justify-center rotate-45"
        >
          <div className="-rotate-45 font-semibold">{index + 1}</div>
        </div>
      );
    }
  })();

  if (data.length === 0 || category.length === 0) {
    return <div className="">Loading...</div>;
  } else {
    console.log(data);

    return (
      <div className="xl:mx-auto xl:w-4/5 w-full drop-shadow-lg box-border min-h-screen">
        <div className="flex justify-center my-10">
          <div className="h-20 w-fit flex items-center text-center px-20 text-white rounded-lg text-2xl font-extrabold bg-yellow-400 ">
            THỂ LOẠI
          </div>
        </div>
        <div className="min-h-fit my-4 rounded-lg flex flex-col sm:flex-row justify-center gap-4 relative">
          {/* need Optimize */}
          {category
            .slice(indexSlice * 5, indexSlice * 5 + 5)
            .map((item, index) => (
              <div
                className="flex items-center justify-center cursor-pointer rounded-md text-white px-4 py-3 bg-yellow-400 dark:bg-lime-400 hover:opacity-80"
                key={item.id}
                onClick={() => setType(item.categoryName)}
              >
                <div className="text-center">{item.categoryName}</div>
              </div>
            ))}
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 duration-500 text-2xl text-white dark:text-lime-200 w-12 h-12 rounded-full bg-yellow-400 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
            onClick={() => prevSlice()}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 duration-500 text-2xl text-white dark:text-lime-200 w-12 h-12 rounded-full bg-yellow-400 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
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
        <div className="shadow-infull dark:shadow-lime-200 dark:bg-transparent bg-slate-100 shadow-yellow-400 rounded-lg mb-4 py-4">
          {data.some((anime) => anime.categories.includes(type)) ? (
            <>
              {data
                .filter((filter) => filter.categories.includes(type))
                .slice(pagination * 6, pagination * 6 + 6)
                .map((item, index) => {
                  return (
                    <Link
                      href={`/anime/${item.filmName}`}
                      onClick={() => {
                        setIdFilm(item.id);
                      }}
                      className="inline-block w-1/2 sm:w-1/4 md:w-1/5 xl:w-1/6 text-center p-4"
                      key={index}
                    >
                      <div className="flex flex-col items-center drop-shadow-xl sm:justify-center rounded-lg transition duration-500 ease-linear group w-full min-h-[15rem] relative">
                        <div className="relative min-h-fit w-40 h-64 rounded-lg cursor-pointer">
                          <Image
                            src={item.thurmUrl}
                            alt={item.filmName}
                            fill
                            className="rounded-lg"
                          />
                          <div className="absolute top-3 right-3 w-10 h-10 bg-gray-500/80 text-yellow-400/80 flex items-center justify-center rounded-full">
                            {item.rated}
                          </div>
                        </div>
                        <div
                          className="dark:text-lime-200 group-hover:font-bold group-hover:text-red-600 dark:group-hover:text-yellow-400  group-hover:drop-shadow-xl 
                                                         w-40 whitespace-nowrap overflow-hidden text-ellipsis text-center mt-2
                                                         "
                        >
                          {item.filmName}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              <div className="flex justify-center">
                <div className="flex gap-4">{indexPagination}</div>
              </div>
            </>
          ) : type === "All" ? (
            <>
              {data
                .slice(pagination * 6, pagination * 6 + 6)
                .map((item, index) => {
                  return (
                    <Link
                      href={`/anime/${item.filmName}`}
                      onClick={() => {
                        setIdFilm(item.id);
                      }}
                      className="inline-block w-1/2 sm:w-1/4 md:w-1/5 xl:w-1/6 text-center p-4"
                      key={index}
                    >
                      <div className="flex flex-col items-center drop-shadow-xl sm:justify-center rounded-lg transition duration-500 ease-linear group w-full min-h-[15rem] relative">
                        <div className="relative min-h-fit w-40 h-64 rounded-lg cursor-pointer">
                          <Image
                            src={item.thurmUrl}
                            alt={item.filmName}
                            fill
                            className="rounded-lg"
                          />
                          <div className="absolute top-3 right-3 w-10 h-10 font-semibold bg-black/80 text-yellow-400/80 flex items-center justify-center rounded-full">
                            {item.rated}
                          </div>
                          <div className="absolute top-2 left-2 w-16 h-16 rounded-full p-1 flex flex-col justify-center items-center text-white bg-yellow-400">
                            <div className="text-center font-medium">
                              {item.episodeCurrent / item.episodeTotal === 1 ? (
                                <div className="font-bold">Hoàn thành</div>
                              ) : (
                                item.episodeCurrent +
                                "/" +
                                (item.episodeTotal == null
                                  ? "?"
                                  : item.episodeTotal)
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="dark:text-lime-200 group-hover:font-bold group-hover:text-red-600 dark:group-hover:text-yellow-400  group-hover:drop-shadow-xl 
                                                              w-40 whitespace-nowrap overflow-hidden text-ellipsis text-center mt-2
                                                              "
                        >
                          {item.filmName}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              <div className="flex justify-center">
                <div className="flex gap-4">{indexPagination}</div>
              </div>
            </>
          ) : (
            <div className="text-center dark:text-lime-200">
              Hiện chưa cập nhật anime thuộc thể loại này
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Genre;
