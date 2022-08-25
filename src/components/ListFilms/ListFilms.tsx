import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ItemFilm } from "../ItemFilm/ItemFilm";
import { Error } from "../Error/Error";

import { fetchCreateGuestSession, fetchMovie } from "../../store/MovieSlice";
import Spinner from "../Spinner/Spinner";
import { CardFilmsStyle, ListFilmsStyle } from "./listFilmsstyle";
import { Pagination } from "@mui/material";
import { SearchFilms } from "../SearchFilms/SearchFilms";
import { Tabs } from "antd";
import "antd/dist/antd.min.css";
import { IItemFilm } from "../../types/types";

const { TabPane } = Tabs;

export const ListFilms = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("return");

  const [ratedMovies, setRatedMovies] = useState<IItemFilm[] | []>([]);

  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movie.movie);
  const isLoading = useAppSelector((state) => state.movie.isLoading);
  const error = useAppSelector((state) => state.movie.error);
  const totalPages = useAppSelector((state) => state.movie.totalPages);

  const ratedMovie: IItemFilm[] = JSON.parse(
    localStorage.getItem("selectedMovies") || "[]"
  );

  useEffect(() => {
    if (!ratedMovies?.length && ratedMovie) {
      setRatedMovies([...ratedMovie, ...ratedMovies]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratedMovies]);

  const saveRatedMovies = (newMovies: IItemFilm) => {
    const isOriginalMovie = ratedMovies?.find(
      (item) => item.id === newMovies.id
    );
    if (!isOriginalMovie) {
      localStorage.setItem(
        "selectedMovies",
        JSON.stringify([newMovies, ...ratedMovies])
      );
      setRatedMovies([newMovies, ...ratedMovies]);
    }
  };

  useEffect(() => {
    dispatch(fetchCreateGuestSession());
    dispatch(fetchMovie({ page, query }));
  }, [page, dispatch, query]);

  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Search" key="1">
          <ListFilmsStyle>
            <SearchFilms setQuery={setQuery} />
            <CardFilmsStyle>
              {error && <Error />}
              {isLoading && !error ? (
                <Spinner />
              ) : movie.length ? (
                movie.map((item) => (
                  <ItemFilm
                    {...item}
                    key={item.id}
                    saveRatedMovies={saveRatedMovies}
                  />
                ))
              ) : !error ? (
                <h3>Nothing was found for your request</h3>
              ) : null}
              {!isLoading && movie.length && !error ? (
                <Pagination
                  shape="rounded"
                  color="primary"
                  size="small"
                  count={totalPages}
                  onChange={(event: React.ChangeEvent<unknown>, page: number) =>
                    setPage(page)
                  }
                  page={page}
                />
              ) : null}
            </CardFilmsStyle>
          </ListFilmsStyle>
        </TabPane>
        <TabPane tab="Rated" key="2">
          <ListFilmsStyle>
            <CardFilmsStyle>
              {ratedMovies?.map((item: JSX.IntrinsicAttributes & IItemFilm) => (
                <ItemFilm {...item} key={item?.id} />
              ))}
            </CardFilmsStyle>
          </ListFilmsStyle>
        </TabPane>
      </Tabs>
    </>
  );
};
