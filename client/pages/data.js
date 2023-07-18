import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faAddressCard,
  faRightToBracket,
  faImage,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export const pages = [
  {
    path: "/",
    name: "Trang chủ",
  },
  {
    path: "/genre",
    name: "Thể loại",
  },
  {
    path: "/season",
    name: "Theo mùa",
  },
  {
    path: "/hot",
    name: "Nổi bật",
  },
];

export const users = [
  {
    path: "/user/sign-in",
    name: "Đăng nhập",
    icon: faUser,
  },
  {
    path: "/user/sign-up",
    name: "Đăng ký",
    icon: faAddressCard,
  },
];

export const account = [
  {
    name: "Thông tin",
    icon: faUser,
    link: "/account/info",
  },
  { name: "Bảo mật", icon: faLock, link: "/account/privacy" },
];

export const userAccount = {
  name: "AcQuy666",
  password: "123",
  birth: "6/6/2016",
  dateCreated: "6/6/2023",
  avatar: "/assets/images/avatar.png",
};
