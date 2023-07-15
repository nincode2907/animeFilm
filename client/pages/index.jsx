import React, { useEffect, useRef, useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { SlideShow } from "@/components/Sections";
import Link from "next/link";
import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";

const index = () => {
  const { data, setData, setIdFilm } = useStateContext();
  const [pagination, setPagination] = useState(0);
  const router = useRouter();
  const indexPagination = [];

  useEffect(() => {
    fetch("http://localhost:8000/api/film")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  (function () {
    const length = data.length / 6;
    for (let index = 0; index < length; index++) {
      indexPagination.push(
        <div
          key={index}
          onClick={() => setPagination(index)}
          className="w-7 h-7 bg-yellow-400 rounded-sm text-white flex items-center justify-center rotate-45"
        >
          <div className="-rotate-45 font-semibold">{index + 1}</div>
        </div>
      );
    }
  })();

  if (data.length === 0) {
    return <div className="">Loading...</div>;
  } else {
    console.log(data);
    return (
      <div>
        <div className="mx-auto lg:w-4/5 min-h-screen z-0  my-4 relative">
          <div className="font-medium transition duration-300 ease-in text-slate-50 bg-yellow-400 dark:text-gray-500 pl-4 py-2 drop-shadow-xl w-full dark:bg-lime-300">
            Nổi bật
          </div>
          <SlideShow
            size={4}
            // items={animes}
            items={data}
          />
          <div className="font-medium transition duration-300 ease-in text-slate-50 bg-yellow-400 mb-4 dark:text-gray-500 pl-4 py-2 drop-shadow-xl w-full dark:bg-lime-300">
            Mới cập nhật
          </div>
          <div className="bg-gray-300/50 rounded-lg sm:px-4 py-4 relative">
            {
              // animes
              //   .sort((a, b) => {
              //     a = a.release.split("/").reverse().join("");
              //     b = b.release.split("/").reverse().join("");
              //     return a > b ? 1 : a < b ? -1 : 0;
              //   })
              data
                .slice(pagination * 6, pagination * 6 + 6)
                .map((item, index) => {
                  return (
                    <Link
                      href={`/anime/${item.filmName}`}
                      onClick={() => {
                        setIdFilm(item.id);
                      }}
                      key={index}
                    >
                      <div className="inline-block w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 drop-shadow-lg group ">
                        <div className="flex flex-col justify-center items-center">
                          <div
                            style={{
                              backgroundImage: `url(${item.thurmUrl})`,
                            }}
                            className="w-40 h-64 relative bg-cover rounded-md opacity-75 group-hover:opacity-100 duration-500 drop-shadow-xl "
                          >
                            <div className="absolute w-12 h-12 top-2 right-2 rounded-full flex justify-center items-center bg-yellow-400">
                              <div className="text-white font-medium">
                                {item.rated}
                              </div>
                            </div>
                            <div className="absolute top-2 left-2 rounded-md p-1 flex flex-col justify-center items-center text-white bg-yellow-400">
                              <FontAwesomeIcon
                                icon={faFilm}
                                className="text-center font-medium"
                              />
                              <div className="text-center font-medium">
                                {item.episodeCurrent / item.episodeTotal === 1
                                  ? "Hoàn thành"
                                  : item.episodeCurrent +
                                    "/" +
                                    (item.episodeTotal == null
                                      ? "?"
                                      : item.episodeTotal)}
                              </div>
                            </div>
                          </div>
                          <div className="w-40 text-yellow-400 dark:text-lime-400 group-hover:text-yellow-400 dark:group-hover:text-lime-300 font-semibold text-center truncate">
                            {item.filmName}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
            }

            <div className="flex justify-center">
              <div className="flex gap-4">{indexPagination}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default memo(index);
