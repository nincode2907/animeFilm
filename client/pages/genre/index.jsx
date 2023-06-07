"use client";

import React, { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { allGenre, animes } from "../data";
import { useState } from "react";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
    className: "center bg-black",
    centerMode: true,
    useCSS: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          verticalSwiping: true,
          swipeToSlide: true,
          vertical: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          verticalSwiping: true,
          swipeToSlide: true,
          vertical: true,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    setGenres("All");
  }, []);

  return (
    <div className="md:mx-auto md:w-4/5 w-full drop-shadow-lg box-border min-h-screen">
      <div className="min-h-fit my-4 rounded-lg">
        {/* need Optimize */}
        {/* <Slider {...settings}>
          {allGenre.map((item, index) => (
            <div
              className="flex items-center justify-center cursor-pointer text-white px-4 py-3 bg-yellow-500 dark:bg-lime-400 hover:opacity-80"
              key={index}
              onClick={() => setGenres(item)}
            >
              <div className="text-center">{item}</div>
            </div>
          ))}
        </Slider> */}
      </div>
      <div className="text-white flex items-center justify-center my-4 cursor-pointer hover:opacity-90">
        <div
          className="bg-red-500 px-6 py-2 rounded-lg"
          onClick={() => setGenres("All")}
        >
          Tất cả
        </div>
      </div>
      <div className="shadow-infull dark:shadow-lime-200 dark:bg-transparent bg-slate-100 shadow-yellow-500 rounded-lg mb-4 py-4">
        {animes.filter((anime) => anime.genres.includes(genres)).length ===
        0 ? (
          <div className="text-center dark:text-lime-200">
            Hiện chưa cập nhật anime thuộc thể loại này
          </div>
        ) : (
          // cần tối ưu 2 vòng lặp
          animes
            .filter((anime) => anime.genres.includes(genres))
            .map((item, index) => {
              return (
                <Link
                  href={`/anime/${item.name}`}
                  className="inline-block w-1/2 sm:w-1/4 md:w-1/5 lg:w-1/6 text-center p-4"
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
            })
        )}
      </div>
    </div>
  );
};

export default Genre;
