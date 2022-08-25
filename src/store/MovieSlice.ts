/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  IInitialState,
  IFetchMovies,
  IGenres,
  IPropsFetchMovie,
  IPropsFetchMovieRated,
  IItemFilm,
} from "../types/types";

export const fetchCreateGuestSession = createAsyncThunk(
  "movie/fetchCreateGuestSession",
  async (_, { rejectWithValue }) => {
    const res = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=5ca9351192cf8dad1d64a9603a0a46bb"
    );
    if (!res.ok) {
      throw rejectWithValue("Server Error!");
    }
    return await res.json();
  }
);

export const fetchMovie = createAsyncThunk<
  IFetchMovies,
  IPropsFetchMovie,
  { rejectValue: string }
>("movie/fetchMovie", async (props, { rejectWithValue }) => {
  const { page, query } = props;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=5ca9351192cf8dad1d64a9603a0a46bb&query=${query}&page=${page}`
  );

  if (!res.ok) {
    throw rejectWithValue("Server Error!");
  }
  const ratedMovie: IItemFilm[] = JSON.parse(
    localStorage.getItem("selectedMovies") || "[]"
  );
  const allFilms: IFetchMovies = await res.json();
  const newRes = allFilms.results.map((item) => {
    const resMovie = ratedMovie.find((el) => item.id === el.id);
    return resMovie ? { ...item, rate: resMovie?.rate } : item;
  });

  return { ...allFilms, results: newRes };
});

export const fetchMovieGenres = createAsyncThunk<
  IGenres,
  undefined,
  { rejectValue: string }
>("movie/fetchMovieGenres", async (_, { rejectWithValue }) => {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=5ca9351192cf8dad1d64a9603a0a46bb&language=en-US"
  );

  if (!res.ok) {
    throw rejectWithValue("Server Error!");
  }

  const result: IGenres = await res.json();
  return result;
});

export const fetchMovieRated = createAsyncThunk<
  any,
  IPropsFetchMovieRated,
  { rejectValue: string }
>("movie/fetchMovieRated", async (props, { rejectWithValue }) => {
  const { rate, id, guestSessionId } = props;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=5ca9351192cf8dad1d64a9603a0a46bb&guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: rate }),
    }
  );
  if (!res.ok) {
    throw rejectWithValue("Server Error!");
  }
  return await res.json();
});

const initialState: IInitialState = {
  movie: [],
  isLoading: false,
  error: false,
  genres: [],
  totalPages: 0,
  ratedMovie: [],
  guestSessionId: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateGuestSession.fulfilled, (state, action) => {
      state.guestSessionId = action.payload.guest_session_id;
    }),
      builder.addCase(fetchMovie.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      }),
      builder.addCase(fetchMovie.fulfilled, (state, action) => {
        state.movie = [...(action.payload as IFetchMovies).results];
        state.isLoading = false;
        state.totalPages = action.payload.total_pages;
      }),
      builder.addCase(fetchMovie.rejected, (state) => {
        state.error = true;
      }),
      builder.addCase(fetchMovieGenres.fulfilled, (state, action) => {
        state.genres = [...(action.payload as IGenres).genres];
      });
  },
});

export default movieSlice.reducer;
