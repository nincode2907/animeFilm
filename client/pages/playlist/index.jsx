import { useStateContext } from "@/context/ContextProvider";
import React from "react";
import Link from "next/link";
import Image from "next/image";
const index = () => {
  const { setPlaylist, playlist } = useStateContext();

  console.log(playlist);

  return (
    <div className="md:w-4/5 w-full bg-slate-100/50 min-h-screen mx-auto">
      <div className="text-xl text-white bg-yellow-500 dark:bg-lime-400 p-3">
        List anime của bạn
      </div>
      <div className=" md:gap-4 py-4 md:p-4">
        {playlist.map((item, index) => (
          <Link
            href={`/anime/${item.name}`}
            className="inline-block w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
          >
            <div
              className="!flex !flex-col !items-center sm:!justify-center rounded-lg opacity-70 hover:opacity-100
            transition duration-500 ease-linear group w-full min-h-[20rem] relative"
              key={index}
            >
              <div className="relative min-h-fit w-40 h-64 p-4 hover:drop-shadow-2xl shadow-full shadow-yellow-500 dark:shadow-lime-200 rounded-lg">
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
      </div>
    </div>
  );
};

export default index;
