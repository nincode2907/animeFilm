import { animes } from "../data";
import React from "react";
import Image from "next/image";

const DynamicRoute = ({ name }) => {
  return (
    <div className="w-3/4 mx-auto py-4">
      {animes
        .filter((item) => item.name === name[0])
        .map((item, index) => (
          <div className="" key={index}>
            <div className="w-full lg:h-96 shadow-infull bg-black/50 dark:bg-transparent shadow-yellow-500 dark:shadow-lime-200 realtive text-white rounded-lg flex items-center justify-around">
              <div className=" relative min-h-fit w-40 h-64 rounded-lg shadow-full shadow-yellow-500 dark:shadow-lime-200">
                <Image
                  src={item.image}
                  fill
                  alt={item.name}
                  className="rounded-lg"
                />
                <div className="text-white absolute top-3/4 h-10 w-3/4 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-lg dark:bg-lime-400 dark:hover:bg-lime-600 hover:bg-yellow-700 bg-yellow-500  cursor-pointer">
                  Xem phim
                </div>
              </div>
              <div className=" basis-1/2 flex flex-col justify-around h-4/6">
                <h1 className="dark:text-lime-200 text-yellow-500 font-semibold text-2xl">
                  {item.name}
                </h1>
                <div className="text-yellow-500 dark:text-lime-200">
                  {item.description}
                </div>
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
              </div>
            </div>
            <div className=" bg-transparent flex justify-center gap-5 h-10 w-full">
              {item.seasons.map((season, idx) => {
                return (
                  <div
                    className="flex items-center justify-center bg-yellow-500 dark:bg-lime-200 py-3 px-6"
                    key={idx}
                  >
                    <div className="text-black">Phần {season}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full py-4 px-3 rounded-lg shadow-infull bg-black/50 dark:bg-transparent shadow-yellow-500 dark:shadow-lime-200">
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
                  {item.currentEpisodes.map((episodes, idx) => (
                    <div
                      className="flex items-center justify-center w-7 h-7 dark:bg-lime-400 bg-yellow-500 rounded-full hover:opacity-80 cursor-pointer"
                      key={idx}
                    >
                      <div className="text-white">{episodes}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="basis-1/2 flex flex-col">
                <div className="dark:text-lime-200 text-yellow-500 flex gap-3 items-center">
                  Thể loại:
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
