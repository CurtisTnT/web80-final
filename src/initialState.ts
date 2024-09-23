import { Film, FilmData } from "./interface";

export const initialFilm: Film = {
  id: "",
  name: "",
  time: "",
  year: 0,
  image: "",
  introduce: "",
};

export const initialFilmData: FilmData = {
  currentPage: 0,
  hasNextPage: false,
  hasPrevPage: false,
  totalItems: 0,
  totalPages: 0,
  items: [],
};
