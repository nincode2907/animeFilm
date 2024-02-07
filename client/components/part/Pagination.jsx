import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IndexPagination } from ".";

const Pagination = (props) => {
  const [pagination, setPagination] = useState(0);
  return (
    <div className="bg-gray-300/50 rounded-lg sm:px-4 py-4 relative">
      {props.data
        .slice(
          pagination * props.itemPerPage,
          pagination * props.itemPerPage + props.itemPerPage
        )
        .map((item, index) => {
          return (
            <Link
              href={`/anime/${item.filmName}/`}
              onClick={() => {
                props.setIdFilm(item.id);
              }}
              key={index}
            >
              <div className="inline-block w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 group">
                <div className="flex flex-col justify-center items-center">
                  <div
                    style={{
                      backgroundImage: `url(${item.thurmUrl})`,
                    }}
                    className="w-40 h-64 outline outline-4 outline-stone-700 drop-shadow-xl hover:outline-orange-400 dark:hover:outline-lime-400 relative bg-cover rounded-md opacity-75 group-hover:opacity-100 duration-500 "
                  >
                    <div className="absolute w-12 h-12 bottom-2 left-2 rounded-full flex justify-center items-center bg-stone-700 dark:bg-lime-400">
                      <div className="text-orange-400 font-medium dark:text-white">
                        {item.rated}
                      </div>
                    </div>
                    <div className="absolute max-w-xs top-2 left-2 rounded-md py-1 px-3 flex gap-3 justify-center items-center text-orange-400 bg-stone-700 dark:bg-lime-400 dark:text-white">
                      <FontAwesomeIcon
                        icon={faFilm}
                        className="text-center font-medium"
                      />
                      <div className="text-center font-medium">
                        {item.episodeCurrent === null
                          ? "?"
                          : item.episodeCurrent / item.episodeTotal === 1
                          ? "Hoàn thành"
                          : item.episodeCurrent +
                            "/" +
                            (item.episodeTotal == null
                              ? "?"
                              : item.episodeTotal)}
                      </div>
                    </div>
                  </div>
                  <div className="w-40 mt-1 text-stone-700 transition duration-500 dark:text-lime-200 group-hover:text-orange-400 dark:group-hover:text-white font-semibold text-center truncate">
                    {item.filmName}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

      <div className="flex justify-center">
        <div className="flex gap-4">
          <IndexPagination
            length={props.data.length}
            itemPerPage={props.itemPerPage}
            setPagination={setPagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
