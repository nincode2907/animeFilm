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
  "Hành động",
  "Phiêu lưu",
  "Hài hước",
  "Shounen",
  "Fantasy",
  "Lãng mạn",
  "Học đường",
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
    genres: ["All", "Drama", "Âm nhạc"],
    rating: 9.6, // cái này để trống cũng đc
    release: "1/4/2023", // cái này ngày đăng video đầu tiên
    totalEpisodes: 12,
    currentEpisodes: [
      {
        epsisode: 1,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 2,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 3,
        video: "/assets/video.mp4",
      },
    ], //cái này là mảng đối tượng gồm số tập vs video nha
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Bleach",
    image: "/assets/images/bleach.jpg",
    poster: "/assets/images/bleach-landscape.jpg",
    genres: ["All", "Shounen", "Hành động", "Hài hước"],
    rating: 9.1,
    release: "1/1/2023",
    totalEpisodes: 12,
    currentEpisodes: [
      {
        epsisode: 1,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 2,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 3,
        video: "/assets/video.mp4",
      },
    ],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Grand Blue",
    image: "/assets/images/grand-blue.jpg",
    poster: "/assets/images/grandblue-landscape.webp",
    genres: ["All", "Hài hước"],
    rating: 10.0,
    release: "20/10/2020",
    totalEpisodes: 12,
    currentEpisodes: [
      {
        epsisode: 1,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 2,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 3,
        video: "/assets/video.mp4",
      },
    ],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Kimetsu No Yaiba",
    image: "/assets/images/kimetsu-no-yaiba.jpg",
    poster: "/assets/images/kimetsu-yaiba-landscape.jpg",
    genres: ["All", "Hành động", "Shounen", "Phiêu lưu"],
    rating: 9.7,
    release: "20/4/2023",
    totalEpisodes: 12,
    currentEpisodes: [
      {
        epsisode: 1,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 2,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 3,
        video: "/assets/video.mp4",
      },
    ],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "One Piece",
    image: "/assets/images/one-piece.webp",
    poster: "/assets/images/one-piece-landscape.jpg",
    genres: ["All", "Shounen", "Hành động"],
    rating: 9.4,
    release: "20/4/2023",
    totalEpisodes: 12,
    currentEpisodes: [
      {
        epsisode: 1,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 2,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 3,
        video: "/assets/video.mp4",
      },
    ],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Horimiya",
    image: "/assets/images/horimiya.jpg",
    poster: "/assets/images/horimiya-landscape.webp",
    genres: ["All", "Lãng mạn", "Học đường"],
    rating: 9.8,
    release: "19/4/2019",
    totalEpisodes: 12,
    currentEpisodes: [
      {
        epsisode: 1,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 2,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 3,
        video: "/assets/video.mp4",
      },
    ],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "One Punch Man",
    image: "/assets/images/one-punch-man.jpg",
    poster: "/assets/images/one-punch-man-landscape.jpg",
    genres: ["All", "Hành động"],
    rating: 9.0,
    release: "20/3/2020",
    totalEpisodes: 12,
    currentEpisodes: [
      {
        epsisode: 1,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 2,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 3,
        video: "/assets/video.mp4",
      },
    ],
    seasons: [1, 2, "Movie 1"],
    addToList: false,
    description:
      "Bạn có bao giờ tự hỏi rằng sẽ thế nào nếu mình là con của 1 người nổi tiếng? Bạn có đầy đủ điều kiện lẫn ngoại hình (nói chung là có gần như mọi thứ...) Chuyện gì sẽ xảy ra khi mình chết rồi được tái sinh thành con của idol mà mình hâm mộ!!!",
  },
  {
    name: "Tensei shitara Slime datta ken",
    image: "/assets/images/slime-datta-ken.jpg",
    poster: "/assets/images/slime-landscape.jpeg",
    genres: ["All", "Hành động", "Fantasy"],
    rating: 9.2,
    release: "9/5/2021",
    totalEpisodes: 12,
    currentEpisodes: [
      {
        epsisode: 1,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 2,
        video: "/assets/video.mp4",
      },
      {
        epsisode: 3,
        video: "/assets/video.mp4",
      },
    ],
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

export const userAccount = {
  name: "AcQuy666",
  password: "123",
  birth: "6/6/2016",
  dateCreated: "6/6/2023",
  avatar: "/assets/images/avatar.png",
};
