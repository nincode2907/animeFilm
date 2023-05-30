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

export const allGenre = [
  "Action",
  "Adventure",
  "Comedy",
  "Shounen",
  "Fantasy",
  "Romance",
  "School",
  "Slice of Life",
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

export const animes = [
  {
    name: "Oshio No Ko",
    image: "/assets/images/oshio-no-ko.jpg",
    poster: "/assets/images/oshio-no-ko-landscape.jpg",
    genres: ["All", "Drama", "Music"],
    rating: 9.6,
    release: "1/4/2023",
    totalEpisodes: 12,
    currentEpisodes: [1, 2, 3, 4, 5, 6, 7],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Bleach",
    image: "/assets/images/bleach.jpg",
    poster: "/assets/images/bleach-landscape.jpg",
    genres: ["All", "Shounen", "Action", "Comedy"],
    rating: 9.1,
    release: "1/1/2023",
    totalEpisodes: 12,
    currentEpisodes: [1, 2, 3, 4, 5, 6, 7],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Grand Blue",
    image: "/assets/images/grand-blue.jpg",
    poster: "/assets/images/grandblue-landscape.webp",
    genres: ["All", "Comedy"],
    rating: 10.0,
    release: "20/10/2020",
    totalEpisodes: 12,
    currentEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Kimetsu No Yaiba",
    image: "/assets/images/kimetsu-no-yaiba.jpg",
    poster: "/assets/images/kimetsu-yaiba-landscape.jpg",
    genres: ["All", "Action", "Shounen", "Adventure"],
    rating: 9.7,
    release: "20/4/2023",
    totalEpisodes: 12,
    currentEpisodes: [1, 2, 3, 4, 5, 6, 7],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "One Piece",
    image: "/assets/images/one-piece.webp",
    poster: "/assets/images/one-piece-landscape.jpg",
    genres: ["All", "Shounen", "Action"],
    rating: 9.4,
    release: "20/4/2023",
    totalEpisodes: 12,
    currentEpisodes: [1, 2, 3, 4, 5, 6, 7],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Horimiya",
    image: "/assets/images/horimiya.jpg",
    poster: "/assets/images/horimiya-landscape.webp",
    genres: ["All", "Romance", "School"],
    rating: 9.8,
    release: "19/4/2019",
    totalEpisodes: 12,
    currentEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "One Punch Man",
    image: "/assets/images/one-punch-man.jpg",
    poster: "/assets/images/one-punch-man-landscape.jpg",
    genres: ["All", "Action"],
    rating: 9.0,
    release: "20/3/2020",
    totalEpisodes: 12,
    currentEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Tensei shitara Slime datta ken",
    image: "/assets/images/slime-datta-ken.jpg",
    poster: "/assets/images/slime-landscape.jpeg",
    genres: ["All", "Action", "Fantasy"],
    rating: 9.2,
    release: "9/5/2021",
    totalEpisodes: 12,
    currentEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
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
