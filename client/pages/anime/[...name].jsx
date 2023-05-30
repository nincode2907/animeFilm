import { animes } from "../data";
import React, { useEffect } from "react";
import {
  faStar,
  faPlusSquare,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useStateContext } from "@/context/ContextProvider";

const DynamicRoute = ({ name }) => {
  const { addPlaylist, setAddPlaylist, setPlaylist, playlist } =
    useStateContext();
  const starRating = [];
  for (let i = 0; i < 10; i++) {
    starRating.push(
      <div className=" text-slate-300 hover:text-yellow-500 cursor-pointer">
        <FontAwesomeIcon icon={faStar} />
      </div>
    );
  }

  return (
    <div className="md:w-3/4 w-full mx-auto py-4">
      {animes
        .filter((item) => item.name === name[0])
        .map((item, index) => (
          <div className="" key={index}>
            <div className="relative w-full lg:h-96 md:shadow-infull dark:bg-transparent shadow-none shadow-yellow-500 dark:shadow-lime-200 realtive text-white rounded-lg flex flex-col md:flex-row items-center justify-around">
              <div className="absolute w-full h-full rounded-lg opacity-30">
                <Image
                  src={item.poster}
                  fill
                  alt={item.name}
                  className="rounded-lg"
                />
              </div>

              <div className="relative min-h-fit my-4 md:my-0 w-40 h-64 rounded-lg shadow-full shadow-yellow-500 dark:shadow-lime-200">
                <Image
                  src={item.image}
                  fill
                  alt={item.name}
                  className="rounded-lg"
                />
                <div className="text-white absolute top-3/4 h-10 w-3/4 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-lg dark:bg-lime-400 dark:hover:bg-lime-600 hover:bg-yellow-700 bg-yellow-500  cursor-pointer">
                  Xem phim
                </div>
                <div className="absolute top-1 left-1 bg-yellow-600/80 dark:bg-lime-500/80 text-sm font-semibold cursor-pointer hover:opacity-80 rounded-lg p-1 px-2">
                  {item.addToList ? (
                    <div
                      onClick={() => {
                        const idx = playlist.indexOf(item);
                        item.addToList = false;
                        setAddPlaylist(item.addToList);
                        playlist.splice(idx, 1);
                      }}
                      className="flex gap-1"
                    >
                      <div className="">
                        <FontAwesomeIcon icon={faCheckSquare} />
                      </div>
                      <div className="">Đã thêm</div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        item.addToList = true;
                        setAddPlaylist(item.addToList);
                        if (!playlist.includes(item)) {
                          setPlaylist((prev) => [...prev, item]);
                        }
                      }}
                      className="flex gap-1"
                    >
                      <div className="">
                        <FontAwesomeIcon icon={faPlusSquare} />
                      </div>
                      <div className="">Thêm vào plalist</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative md:basis-1/2 flex flex-col justify-around min-h-4/6 bg-gray-600/50 p-4 rounded-xl">
                <h1 className="dark:text-lime-200 text-yellow-500 font-semibold text-2xl drop-shadow-2xl ">
                  {item.name}
                </h1>
                <div className="text-yellow-500 dark:text-lime-200 py-2 my-4 border-2 border-transparent border-y-yellow-500 dark:border-y-lime-300">
                  {item.description}
                </div>
                <div className="flex items-center md:gap-10 gap-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90 shadow-full shadow-slate-300 rounded-full">
                      <circle
                        cx={32}
                        cy={32}
                        r={30}
                        stroke="#d9f99d"
                        fill="transparent"
                        strokeWidth={4}
                      />
                      <circle
                        cx={32}
                        cy={32}
                        r={30}
                        stroke="#eab308"
                        fill="transparent"
                        strokeWidth={4}
                        strokeDashoffset={190 - (190 * item.rating * 10) / 100}
                        strokeDasharray={190}
                      />
                      {/* <circle cx={32} cy={32} r={20} fill="#fff" /> */}
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-xl text-lime-200">
                      {item.rating}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">{starRating}</div>
                    <div className="text-sm text-yellow-500 dark:text-lime-300">
                      Đánh giá
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bg-transparent inline-block md:flex md:justify-center md:gap-5 h-10 w-full">
              {item.seasons.map((season, idx) => {
                return (
                  <div
                    className="flex items-center justify-center bg-yellow-500 dark:bg-lime-400 py-3 px-6 rounded-sm"
                    key={idx}
                  >
                    <div className="text-white">Phần {season}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 md:flex-row w-full py-5 px-1 md:p-5 rounded-lg shadow-none md:shadow-infull bg-black/40 dark:bg-transparent shadow-yellow-500 dark:shadow-lime-200">
              <div className="basis-1/2 dark:text-lime-200 text-yellow-500 flex flex-col gap-4">
                <div className="">Ngày ra mắt: {item.release}</div>
                <div className="">
                  Trạng thái:{" "}
                  {item.currentEpisodes.length / item.totalEpisodes === 1
                    ? "Hoàn thành"
                    : item.currentEpisodes.length + "/" + item.totalEpisodes}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  Tập mới:
                  {item.currentEpisodes
                    .slice(-3)
                    .reverse()
                    .map((episodes, idx) => (
                      <div
                        className="flex items-center justify-center w-8 h-8 dark:bg-lime-400 bg-yellow-500 rounded-full hover:opacity-80 cursor-pointer"
                        key={idx}
                      >
                        <div className="text-white">{episodes}</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="basis-1/2 flex flex-col">
                <div className="dark:text-lime-200 text-yellow-500 flex gap-3 flex-wrap items-center">
                  <span className="min-w-[4rem]">Thể loại:</span>
                  {item.genres.slice(1).map((genre, idx) => (
                    <div
                      className="flex items-center justify-center py-2 px-3 dark:bg-lime-400 bg-yellow-600 rounded-lg hover:opacity-80 cursor-pointer"
                      key={idx}
                    >
                      <div className="text-white ">{genre}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

DynamicRoute.getInitialProps = ({ query: { name } }) => {
  return { name };
};

export default DynamicRoute;
