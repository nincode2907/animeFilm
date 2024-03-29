import React, { useEffect, useRef, useState } from "react";
import {
  faStar,
  faPlusSquare,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useStateContext } from "@/context/ContextProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import { breakpoints } from "@/api/Api";
import { Waiting } from "@/components/part";

const DynamicRoute = () => {
  const router = useRouter();
  const [detailItem, setDetailItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { setEpisodes, episodes } = useStateContext();
  const isMounted = useRef(true);
  const { name, id } = router.query;

  const { setAddPlaylist, setPlaylist, playlist, setVideo, idFilm } =
    useStateContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filmAPI = await fetch(breakpoints.filmById(idFilm));
        if (!filmAPI.ok) {
          throw new Error("Load Film Failed");
        }
        const dataFilm = await filmAPI.json();
        const epAPI = await fetch(breakpoints.episode);
        if (!epAPI.ok) {
          throw new Error("Load Episode Failed");
        }
        const dataEp = await epAPI.json();

        // Kiểm tra xem component có còn tồn tại hay không trước khi cập nhật state
        if (isMounted.current) {
          setEpisodes(dataEp.filter((item) => item.filmName === name));
          setDetailItem(dataFilm);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Đánh dấu component đã unmount
      isMounted.current = false;
    };
  }, [idFilm, name]);

  //   const dashOffset = 190 - (190 * detailItem.rated * 10) / 100;
  const dashOffset = 190 - (190 * 9 * 10) / 100;
  const starRating = [];

  (() => {
    for (let i = 0; i < 10; i++) {
      starRating.push(
        <div
          key={i}
          className=" text-slate-300 hover:text-orange-400 cursor-pointer peer peer-hover:text-orange-400"
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    }
  })();

  const formatDate = (d) => {
    const date = new Date(d);
    return date.getUTCFullYear();
  };

  if (isLoading) {
    return <Waiting />;
  } else {
    return (
      <div className="md:w-3/4 w-full mx-auto py-4 min-h-screen">
        <div className="">
          <div className="relative w-full lg:h-96 md:shadow-infull dark:bg-transparent shadow-none md:shadow-orange-400 dark:shadow-lime-200 realtive text-white rounded-lg flex flex-col md:flex-row items-center justify-around">
            <div className="absolute w-full h-full rounded-lg opacity-30">
              <Image
                src={detailItem.posterUrl}
                fill
                alt={detailItem.filmName}
                className="rounded-lg"
              />
            </div>

            <div className="relative min-h-fit my-4 md:my-0 w-48 h-72 rounded-lg shadow-full shadow-orange-400 dark:shadow-lime-200">
              <Image
                src={detailItem.thurmUrl}
                fill
                alt={detailItem.filmName}
                className="rounded-lg"
              />
              <Link
                href={`${detailItem.filmName}/episode/1`}
                onClick={() => setVideo(1)}
              >
                <div
                  className="text-white absolute bottom-5 h-10 w-3/4 left-1/2 -translate-x-1/2 flex items-center justify-center transition duration-500
                rounded-lg dark:bg-lime-400 dark:hover:bg-lime-600 hover:text-stone-700 font-semibold hover:bg-orange-400 bg-orange-400 cursor-pointer"
                >
                  Xem phim
                </div>
              </Link>
              <div className="absolute top-2 left-1 transition duration-500 bg-orange-400 dark:bg-lime-500/80 text-sm font-semibold cursor-pointer hover:opacity-80 rounded-lg p-1 px-2">
                {detailItem.addToList ? (
                  <div
                    onClick={() => {
                      const idx = playlist.indexOf(item);
                      detailItem.addToList = false;
                      setAddPlaylist(detailItem.addToList);
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
                      detailItem.addToList = true;
                      setAddPlaylist(detailItem.addToList);
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
            {/*  */}
            <div className="relative md:basis-1/2 flex flex-col justify-around min-h-4/6 bg-stone-700/80 p-4 rounded-xl">
              <h1 className="dark:text-lime-200 text-orange-400 font-semibold text-2xl drop-shadow-2xl ">
                {detailItem.filmName}
              </h1>
              <div className="text-orange-400 dark:text-lime-200 overflow-y-auto max-h-32 py-4 my-4 border-2 border-transparent border-y-orange-400 dark:border-y-lime-300">
                <div className="">{detailItem.description}</div>
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
                      strokeDashoffset={dashOffset}
                      strokeDasharray={190}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-xl text-lime-200">
                    {detailItem.rated}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row-reverse gap-2">
                    {starRating}
                  </div>
                  <div className="text-sm text-orange-400 dark:text-lime-300 font-semibold">
                    Đánh giá
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className=" bg-transparent inline-block md:flex md:justify-center md:gap-5 h-10 w-full">
            {detailItem.series.length < 1 ? (
              <div className="flex items-center justify-center bg-orange-400 dark:bg-lime-400 py-3 px-6 rounded-sm">
                <div className="text-white">Đang cập nhật</div>
              </div>
            ) : (
              <>
                {detailItem.series.map((season, idx) => {
                  return (
                    <div
                      className="flex items-center justify-center bg-orange-400 dark:bg-lime-400 py-3 px-6 rounded-sm"
                      key={idx}
                    >
                      <div className="text-white">{season.part}</div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          {/*  */}
          <div className="flex flex-col gap-4 md:flex-row w-full py-5 px-1 md:p-5 rounded-lg shadow-none md:shadow-infull bg-stone-700/80 dark:bg-transparent md:shadow-orange-400 dark:shadow-lime-200">
            <div className="basis-1/2 dark:text-lime-200 text-orange-400 flex flex-col gap-4">
              <div className="">
                Ngày ra mắt: {formatDate(detailItem.released)}
              </div>
              <div className="">
                Trạng thái:{" "}
                {detailItem.episodeCurrent / detailItem.episodeTotal === 1
                  ? "Hoàn thành"
                  : detailItem.episodeCurrent +
                    " / " +
                    (detailItem.episodeTotal == null
                      ? "?"
                      : detailItem.episodeTotal)}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                Tập mới:
                {episodes
                  .slice(-3)
                  .reverse()
                  .map((item, idx) => (
                    <Link
                      href={`${detailItem.filmName}/episode/${item.number_set}`}
                      key={idx}
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 dark:bg-lime-400 bg-orange-400 rounded-full hover:opacity-80 cursor-pointer"
                        onClick={() => setVideo(item.number_set)}
                      >
                        <div className="text-white">{item.number_set}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="basis-1/2 flex flex-col">
              <div className="dark:text-lime-200 text-orange-400 flex gap-3 flex-wrap items-center">
                <span className="min-w-[4rem]">Thể loại:</span>
                {detailItem.categories.slice(1).map((genre, idx) => (
                  <div
                    className="flex items-center justify-center py-2 px-3 dark:bg-lime-400 bg-orange-400 rounded-lg hover:opacity-80 cursor-pointer"
                    key={idx}
                  >
                    <div className="text-white ">{genre}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DynamicRoute;
