import React, { useEffect, useRef, useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { SlideShow } from "@/components/Sections";
import Link from "next/link";
import { useStateContext } from "@/context/ContextProvider";
import { Pagination, TitleTheme } from "@/components/part";
import { useRouter } from "next/router";

const index = () => {
  const { data, setData, setIdFilm } = useStateContext();

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8000/api/film")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  if (data.length === 0) {
    return <div className="">Loading...</div>;
  } else {
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
  }
};

export default memo(index);
