import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { animes } from "./data";
import { SlideShow } from "@/components/Sections";

const index = () => {
  //   useEffect(() => {
  //     fetch("http://localhost:8000/api/film/")
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));
  //   }, []);

  return (
    <div>
      <div className="mx-auto lg:w-4/5 min-h-screen z-0 relative">
        <div className="font-medium text-gray-400 bg-yellow-400 mt-4 dark:text-black pl-4 py-2 drop-shadow-xl w-full dark:bg-lime-300">
          Nổi bật
        </div>
        <SlideShow size={4} items={animes} />
        <div className="font-medium text-gray-400 bg-yellow-400 mb-4 dark:text-black pl-4 py-2 drop-shadow-xl w-full dark:bg-lime-300">
          Mới cập nhật
        </div>
        <SlideShow size={5} items={animes.sort()} />
      </div>
    </div>
  );
};

export default index;
