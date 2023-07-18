import React, { memo } from "react";

const IndexPagination = (props) => {
  const indexPage = [];
  const length = Math.ceil(props.length / props.itemPerPage);
  for (let index = 0; index < length; index++) {
    indexPage.push(index);
  }

  return (
    <>
      {indexPage.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => props.setPagination(item)}
            className="w-7 h-7 bg-yellow-400 cursor-pointer rounded-md text-white flex items-center justify-center rotate-45"
          >
            <div className="-rotate-45 font-semibold">{item + 1}</div>
          </div>
        );
      })}
    </>
  );
};

export default memo(IndexPagination);
