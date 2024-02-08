import React from "react";

const Waiting = () => {
  return (
    <div className="animate-pulse min-h-screen bg-slate-500 flex items-center justify-center">
      <div className="text-4xl text-white font-semibold tracking-[.5rem] animate-pulse">
        Đang tải
      </div>
      <div className="animate-bounce text-white text-4xl pl-2">.</div>
      <div className="animate-[bounce_1.25s_infinite] text-white text-4xl pl-2">
        .
      </div>
      <div className="animate-[bounce_1.25s_infinite] text-white text-4xl pl-2">
        .
      </div>
    </div>
  );
};

export default Waiting;
