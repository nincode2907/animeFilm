import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div>
      <div className="">
        <img src="" alt="" />
      </div>

      <div className="">
        <ul>
          <li>
            <Link href="/">Trang chủ</Link>
          </li>
          <li>
            <Link href="">Thể loại</Link>
          </li>
          <li>
            <Link href="">Top anime</Link>
          </li>
          <li>
            <Link href="">Lịch chiếu</Link>
          </li>
        </ul>
      </div>

      <div className="">
        <div className="search">
          <input type="text" />
        </div>
        <div className="user">
          <div className="symbol-user"></div>
          <div className="expand">
            <ul>
              <li>
                <Link href="">Đăng nhập</Link>
              </li>
              <li>
                <Link href="">Đăng ký</Link>
              </li>
              <li>
                <Link href="">My Lists</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
