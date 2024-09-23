export type Film = {
  id: string;
  name: string;
  time: string;
  year: number;
  image: string;
  introduce: string;
};

export type FilmData = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  totalPages: number;
  items: Film[];
};
