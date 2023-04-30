import { icon } from "@fortawesome/fontawesome-svg-core"
import { faUser, faAddressCard, faRightToBracket } from "@fortawesome/free-solid-svg-icons"

export const pages = [{
          path: '/',
          name: 'Trang chủ'
}, 
{
          path: '/genre',
          name: 'Thể loại'
},
{
          path: '/season',
          name: "Theo mùa"
},
{
          path: '/hot',
          name: "Nổi bật"
}
]

export const users = [{
          path: '/login',
          name: 'Đăng nhập',
          icon: faUser,
},
{
          path: '/register',
          name: 'Đăng ký',
          icon: faAddressCard,
},
{
          path: '/logout',
          name: 'Thoát',
          icon: faRightToBracket,
},
]

export const animes = [{
          name: 'Oshio No Ko',
          image: '/assets/images/oshio-no-ko.jpg',
          genre: [""],
          rating: 9.6,
          release: "1/4/2023"
},{
          name: 'Bleach',
          image: '/assets/images/bleach.jpg',
          genre: [""],
          rating: 9.1,
          release: "1/1/2023"
},{
          name: 'Grand Blue',
          image: '/assets/images/grand-blue.jpg',
          genre: [""],
          rating: 10.0,
          release: "20/10/2020"
}, {
          name: 'Kimetsu No Yaiba',
          image: '/assets/images/kimetsu-no-yaiba.jpg',
          genre: [""],
          rating: 9.7,
          release: "20/4/2023"
}, {
          name: 'One Piece',
          image: '/assets/images/one-piece.webp',
          genre: [""],
          rating: 9.4,
          release: "20/4/2023"
}, {
          name: 'Horimiya',
          image: '/assets/images/horimiya.jpg',
          genre: [""],
          rating: 9.8,
          release: "19/4/2019"
}, {
          name: 'One Punch Man',
          image: '/assets/images/one-punch-man.jpg',
          genre: [""],
          rating: 9.0,
          release: "20/3/2020"
}, {
          name: 'Tensei shitara Slime datta ken',
          image: '/assets/images/slime-datta-ken.jpg',
          genre: [""],
          rating: 9.2,
          release: "9/5/2021"
}
]