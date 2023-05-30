import React from "react";
import Account from "../Account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const index = () => {
  return (
    <>
      <Account>
        <div className="dark:bg-lime-200 bg-yellow-400 text-gray-400 font-semibold text-xl tracking-widest italic pl-5 py-2 ">
          Avatar
        </div>
        <div className="my-3 flex flex-col items-center">
          <div className="w-40 h-40 border-4 rounded-full bg-slate-100/30 dark:border-lime-400 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faCamera}
              className="text-3xl text-gray-400"
            />
          </div>
          <div className="flex gap-10">
            <div className=" bg-slate-200 dark:text-lime-400 text-semibold px-6 py-3 mt-5 rounded-md">
              Đổi ảnh đại diện
            </div>
            <div className=" bg-slate-200 dark:text-lime-400 text-semibold px-6 py-3 mt-5 rounded-md">
              Xác nhận
            </div>
          </div>
        </div>
        <div className="dark:bg-lime-200 bg-yellow-400 text-gray-400 font-semibold text-xl tracking-widest italic pl-5 py-2 ">
          Thông tin tài khoản
        </div>
        <div className="flex flex-col gap-5 pl-4 py-4 dark:text-slate-50 text-gray-500 font-semibold">
          <div className="">Tên tài khoản:</div>
          <div className="">Ngày sinh:</div>
          <div className="">Lập tài khoản vào ngày:</div>
        </div>
      </Account>
    </>
  );
};

export default index;
