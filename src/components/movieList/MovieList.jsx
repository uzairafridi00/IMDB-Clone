import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import "./MovieList.css";

import { useParams } from "react-router-dom";

import "dotenv/config";

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${
        process.env.REACT_APP_THEMOVIE_API_TOKEN
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

  return (
    <>
      <div className="movie__list">
        <h2 className="list__title">
          {(type ? type : "POPULAR").toUpperCase()}
        </h2>
        <div className="listCards">
          {movieList.map((movie) => (
            <Card movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieList;
