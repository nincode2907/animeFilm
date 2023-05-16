import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { animes } from "@/pages/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "@/context/ContextProvider";
import Link from "next/link";

const SlideShow = (props) => {
  const slide = useRef();
  const { detailAnime, setDetailAnime } = useStateContext();

  const settings = {
    dots: false,
    slidesToShow: props.size,
    slidesToScroll: 1,
    className: "center ",
    centerMode: true,
    infinite: true,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: true,
        },
      },
    ],
  };

  return (
    <div className="min-h-full md:bg-gray-100 md:dark:bg-neutral-500 md:rounded-lg my-4 py-4 px-2 md:dark:shadow-infull md:dark:shadow-lime-200">
      <div className="relative">
        <Slider {...settings} ref={slide}>
          {props.items.map((item, index) => (
            <Link href={`/anime/${item.name}`}>
              <div
                className="!flex !flex-col !items-center sm:!justify-center rounded-lg opacity-70 hover:opacity-100
            transition duration-500 ease-linear group w-full min-h-[24rem] relative"
                key={index}
              >
                <div className="relative min-h-fit w-40 h-64 hover:drop-shadow-2xl shadow-full shadow-yellow-500 dark:shadow-lime-200 rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-lg cursor-pointer"
                  />
                  <div className="absolute top-3 right-3 w-10 h-10 bg-gray-500/80 text-yellow-300/80 flex items-center justify-center rounded-full">
                    {item.rating}
                  </div>
                </div>
                <div
                  className="dark:text-lime-200 group-hover:font-bold group-hover:text-yellow-400 group-hover:drop-shadow-xl group-hover:drop-shadow-yellow-400
                w-40 whitespace-nowrap overflow-hidden text-ellipsis text-center pt-3
                "
                >
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl text-gray-400 dark:text-lime-200 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
          onClick={() => slide.current.slickPrev()}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-gray-400 dark:text-lime-200 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
          onClick={() => slide.current.slickNext()}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
