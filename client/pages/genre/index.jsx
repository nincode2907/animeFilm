"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { allGenre, animes } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";
import {
  NextAndPrev,
  Pagination,
  TitleTheme,
  Waiting,
} from "@/components/part";
import { breakpoints } from "@/api/Api";

const Genre = () => {
  const [type, setType] = useState("All");
  const { setIdFilm } = useStateContext();
  const [indexSlice, setIndexSlice] = useState(0);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  //   const [pagination, setPagination] = useState(0);
  //   const indexPagination = [];
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const cateAPI = await fetch(breakpoints.category);
        if (!cateAPI.ok) {
          throw new Error("Load Category Failed!");
        }
        const json = await cateAPI.json();
        const filmAPI = await fetch(breakpoints.film);
        if (!filmAPI.ok) {
          throw new Error("Load Film Failed!");
        }
        const data = await api.json();
        setData(data);
        setCategory(json);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [router.asPath]);

  if (data.length === 0 && category.length === 0) {
    return <Waiting />;
  }
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
              className="flex items-center justify-center cursor-pointer rounded-md text-white px-4 py-3 bg-orange-400 dark:bg-lime-400transition duration-500 font-semibold hover:text-orange-400 hover:bg-stone-700"
              key={item.id}
              onClick={() => setType(item.categoryName)}
            >
              <div className="text-center">{item.categoryName}</div>
            </div>
          ))}
        <NextAndPrev
          indexSlice={indexSlice}
          setIndexSlice={() => setIndexSlice}
        />
      </div>
      {/*  */}
      <div className="text-white flex items-center justify-center my-4 cursor-pointer hover:opacity-90">
        <div
          className="bg-orange-400 px-6 py-2 rounded-lg transition duration-500 font-semibold hover:text-orange-400 hover:bg-stone-700"
          onClick={() => setType("All")}
        >
          Tất cả
        </div>
      </div>
      {/*  */}
      <div className=" dark:bg-transparent bg-slate-100 rounded-lg mb-4">
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
          <div className="text-center dark:text-lime-200 py-4">
            Hiện chưa cập nhật anime thuộc thể loại này
          </div>
        )}
      </div>
    </div>
  );
};

export default Genre;
