"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { allGenre, animes } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";
import { Pagination, TitleTheme } from "@/components/part";

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

  if (data.length === 0 || category.length === 0) {
    return <div className="">Loading...</div>;
  } else {
    return (
      <div className="xl:mx-auto xl:w-4/5 w-full drop-shadow-lg box-border min-h-screen">
        <div className="flex justify-center my-10">
          <TitleTheme title={"Thể loại"} />
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
              <Pagination
                data={data.filter((filter) => filter.categories.includes(type))}
                setIdFilm={setIdFilm}
                itemPerPage={12}
              />
            </>
          ) : type === "All" ? (
            <>
              <Pagination data={data} setIdFilm={setIdFilm} itemPerPage={12} />
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
