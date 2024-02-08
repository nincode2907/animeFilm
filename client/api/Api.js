const SERVER = "http://localhost:8000";

export const breakpoints = {
  // API FOR FILM
  film: `${SERVER}/api/film/`,
  filmById: (id) => `${SERVER}/api/film/edit?id=${id}`,
  // API FOR EPISODE
  episode: `${SERVER}/api/episode/`,
  // API FOR CATEGORY
  category: `${SERVER}/api/category/`,
  // API FOR COUNTRY
  country: `${SERVER}/api/country/`,
  // API FOR NOTIFICATION
  notifi: `${SERVER}/api/notify/`,
  // API FOR SERIES
  series: `${SERVER}/api/series/`,
};
