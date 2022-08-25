import { Dispatch, SetStateAction } from "react";

export interface IInitialState {
  movie: IItemFilm[];
  isLoading: boolean;
  error: boolean;
  genres: IGenreOne[];
  totalPages: number;
  ratedMovie: IItemFilm[];
  guestSessionId: string;
}

export interface IFetchMovies {
  page: number;
  results: IItemFilm[];
  total_pages: number;
  total_results: number;
}

export interface IItemFilm {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rate: number;
  saveRatedMovies: (newMovies: IItemFilm) => void;
  setRateMovie: Dispatch<SetStateAction<any[]>>;
}

export interface IGenres {
  genres: IGenreOne[];
}

export interface IGenreOne {
  id: number;
  name: string;
}

export interface IQuery {
  page?: number;
  query?: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export interface IPropsFetchMovie {
  page: number;
  query: string;
}

export interface IPropsFetchMovieRated {
  rate: number;
  id: number;
  guestSessionId: string;
}
