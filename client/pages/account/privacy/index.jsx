import React from "react";
import Account from "../Account";
import { InputCustom } from "@/components/Sections";
const Privacy = () => {
  return (
    <Account>
      <div className="dark:bg-lime-200 bg-yellow-400 text-gray-400 font-semibold text-xl tracking-widest italic pl-5 py-2 ">
        Mật khẩu
      </div>
      <div className="flex flex-col items-center py-4 bg-yellow-600 dark:bg-lime-400">
        <InputCustom type="text" required={false} name={"Mật khẩu mới"} />
        <InputCustom type="text" required={false} name={"Xác nhận mật khẩu"} />
        <div className=" dark:bg-slate-100 bg-slate-300/50 dark:text-lime-400 text-yellow-200 cursor-pointer dark:hover:bg-slate-100/70 hover:bg-slate-200/50 text-semibold px-6 py-3 mt-5 rounded-md">
          Đổi mật khẩu
        </div>
      </div>
      <div className="dark:bg-lime-200 bg-yellow-400 text-gray-400 font-semibold text-xl tracking-widest italic pl-5 py-2 ">
        Bảo mật cấp 2
      </div>
    </Account>
  );
};

export default Privacy;
