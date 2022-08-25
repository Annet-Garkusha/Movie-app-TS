/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SyntheticEvent, useEffect, useState } from "react";

import {
  FilmStyle,
  ImageFilmStyle,
  ContentFilmStyle,
  TitleFilmStyle,
  RateFilmStyle,
  OverviewFilmStyle,
  DataFilmStyle,
  GenreListFilmStyle,
  GenreItemFilmStyle,
} from "./ItemFilmstyle";
import { IItemFilm } from "../../types/types";
import { format } from "date-fns";
import { fetchMovieGenres, fetchMovieRated } from "../../store/MovieSlice";

import { v4 as uuidv4 } from "uuid";
import { Rating } from "@mui/material";

export const ItemFilm = ({
  poster_path,
  original_title,
  release_date,
  overview,
  vote_average,
  genre_ids,
  rate,
  id,
  saveRatedMovies,
}: IItemFilm): JSX.Element => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.movie.genres);
  const guestSessionId = useAppSelector((state) => state.movie.guestSessionId);

  const [genreList, setGenreList] = useState<(string | undefined)[]>([]);

  const date = release_date ? (
    format(new Date(release_date), "MMMM dd, yyyy")
  ) : (
    <span>Data</span>
  );

  const saveText = (overview: string): string => {
    let newText = "";
    if (overview?.length > 150) {
      newText = overview.slice(0, 150);
      let lastIndex = newText.lastIndexOf(" ");
      newText = newText.slice(0, lastIndex) + "...";
    } else newText = overview + "...";
    return newText;
  };

  useEffect(() => {
    if (!genres.length) {
      dispatch(fetchMovieGenres());
    }
    const genresMovie = genres?.map((genre) => {
      if (genre_ids?.includes(genre.id)) {
        return genre.name;
      }
    });

    setGenreList(genresMovie);
  }, [genres]);
  const changeRateMovie = (e: SyntheticEvent<Element, Event>) => {
    const rate = Number((e.target as HTMLInputElement).value);
    dispatch(fetchMovieRated({ rate, id, guestSessionId }));

    const newMovies = {
      poster_path,
      original_title,
      release_date,
      overview,
      vote_average,
      genre_ids,
      id,
      rate,
    };
    saveRatedMovies(newMovies as IItemFilm);
  };

  return (
    <FilmStyle>
      {!poster_path ? (
        <ImageFilmStyle
          src={
            "https://st2.depositphotos.com/1526816/6758/v/600/depositphotos_67585141-stock-illustration-oops.jpg"
          }
          alt="Logo"
        ></ImageFilmStyle>
      ) : (
        <ImageFilmStyle
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="Logo"
        ></ImageFilmStyle>
      )}
      <ContentFilmStyle>
        <TitleFilmStyle>{original_title}</TitleFilmStyle>
        <RateFilmStyle colorRate={vote_average}>{vote_average}</RateFilmStyle>
        <DataFilmStyle>{date}</DataFilmStyle>
        <GenreListFilmStyle>
          {genreList.map((genre) => {
            if (genre !== undefined) {
              return (
                <GenreItemFilmStyle key={uuidv4()}>{genre}</GenreItemFilmStyle>
              );
            }
          })}
        </GenreListFilmStyle>

        <OverviewFilmStyle>{saveText(overview)}</OverviewFilmStyle>
        <Rating
          style={{ position: "absolute", bottom: "10px" }}
          name="simple-controlled"
          precision={0.5}
          size="small"
          max={10}
          onChange={(e: React.SyntheticEvent<Element, Event>) =>
            changeRateMovie(e)
          }
          value={rate}
        />
      </ContentFilmStyle>
    </FilmStyle>
  );
};
