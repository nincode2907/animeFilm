import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faFilm,
  faStar,
  faVideoCamera,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "@/context/ContextProvider";

const SlideShow = (props) => {
  const { setIdFilm } = useStateContext();
  const [indexSlide, setIndexSlide] = useState(0);
  const timeInterval = useRef();

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      setIndexSlide((prev) => (prev === props.items.length - 1 ? 0 : ++prev));
    }, 4000);
    return () => {
      clearInterval(timeInterval.current);
    };
  }, []);

  const prevSlide = () => {
    const isFirst = indexSlide === 0;
    const prev = isFirst ? props.items.length - 1 : indexSlide - 1;
    setIndexSlide(prev);
  };

  const nextSlide = () => {
    const isLast = indexSlide === props.items.length - 1;
    const next = isLast ? 0 : indexSlide + 1;
    setIndexSlide(next);
  };

  const formatDate = (d) => {
    const date = new Date(d);
    return date.getUTCFullYear();
  };

  return (
    <div className="h-96 overflow-hidden relative group md:bg-gray-300/50 md:dark:bg-neutral-500/30 md:rounded-lg my-4 py-4 md:dark:shadow-infull md:dark:shadow-lime-200">
      <div className="relative flex h-full w-11/12 mx-auto  ">
        <div className="absolute drop-shadow-xl rounded-md opacity-50 h-full w-full bg-transparent duration-500 ">
          <Image
            src={props.items[indexSlide].posterUrl}
            alt={props.items[indexSlide].filmName}
            fill
          />
        </div>
        <div className="md:basis-1/2 overflow-x-hidden relative flex flex-col gap-4 rounded-tl-md rounded-bl-md bg-black/50 h-full py-4 px-3 text-yellow-400 dark:text-lime-400">
          <div className="basis-1/5 text-2xl font-semibold truncate">
            {props.items[indexSlide].filmName}
          </div>
          <div className="basis-1/5 flex gap-4">
            <div className="">
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              {props.items[indexSlide].rated}
            </div>
            <div className="">
              <FontAwesomeIcon icon={faFilm} className="mr-2 text-center" />
              {props.items[indexSlide].episodeCurrent /
                props.items[indexSlide].episodeTotal ===
              1
                ? "Hoàn thành"
                : props.items[indexSlide].episodeCurrent +
                  "/" +
                  (props.items[indexSlide].episodeTotal == null
                    ? "???"
                    : props.items[indexSlide].episodeTotal)}
            </div>
            <div className="">
              <FontAwesomeIcon icon={faVideoCamera} className="mr-2" />
              {props.items[indexSlide].released == null
                ? "?"
                : formatDate(props.items[indexSlide].released)}
            </div>
          </div>
          <div className="basis-3/5 border-y-2 border-x-none border-yellow-400 dark:border-lime-400 lg:py-5 py-3 px-2 overflow-y-auto ">
            {props.items[indexSlide].description}
          </div>
          <div className="">
            Thể loại:{" "}
            <span className="ml-2">
              {props.items[indexSlide].categories.length === 0
                ? "Đang cập nhật"
                : props.items[indexSlide].categories
                    .slice(1)
                    .map((item, index) => {
                      return props.items[indexSlide].categories
                        .slice(1)
                        .indexOf(item) === 0
                        ? item
                        : ", " + item;
                    })}
            </span>
          </div>
          <Link
            href={`/anime/${props.items[indexSlide].filmName}/`}
            onClick={() => setIdFilm(props.items[indexSlide].id)}
          >
            <div className="bg-yellow-400 dark:bg-lime-400 text-white font-semibold text-lg w-40 text-center rounded-md py-3">
              <FontAwesomeIcon icon={faPlay} className="mr-2" /> Xem phim
            </div>
          </Link>
        </div>
      </div>

      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 duration-500 text-2xl text-white dark:text-lime-200 w-12 h-12 rounded-full bg-yellow-400 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
        onClick={() => prevSlide()}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 duration-500 text-2xl text-white dark:text-lime-200 w-12 h-12 rounded-full bg-yellow-400 dark:bg-slate-500/70 cursor-pointer dark:hover:bg-slate-500 flex justify-center items-center"
        onClick={() => nextSlide()}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
};

export default SlideShow;
