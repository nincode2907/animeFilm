import React, { useEffect, useRef, useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { SlideShow } from "@/components/Sections";
import Link from "next/link";
import { useStateContext } from "@/context/ContextProvider";
import { Pagination, TitleTheme, Waiting } from "@/components/part";
import { useRouter } from "next/router";
import { breakpoints } from "@/api/Api";

const index = () => {
  const { setIdFilm } = useStateContext();
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const api = await fetch(breakpoints.film);
        if (!api.ok) {
          throw new Error("Load film failed!");
        }
        const data = await api.json();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  if (data.length === 0) return <Waiting />;

  return (
    <div>
      <div className="mx-auto lg:w-4/5 min-h-screen z-0  my-4 relative">
        <TitleTheme title={"Nổi bật"} />
        <SlideShow size={4} items={data} />
        <TitleTheme title={"Mới cập nhật"} />
        <Pagination data={data} setIdFilm={setIdFilm} itemPerPage={12} />
      </div>
    </div>
  );
};

export default memo(index);
