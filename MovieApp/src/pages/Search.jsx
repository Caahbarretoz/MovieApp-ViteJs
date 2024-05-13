import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import styles from "./Search.module.css";
import { Link } from "react-router-dom";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams([]);

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  async function getMovies(urlMovie, urlSerie) {
    const resMovie = await fetch(urlMovie);
    const resSerie = await fetch(urlSerie);
    const dataMovie = await resMovie.json();
    const dataSerie = await resSerie.json();
    const combinedResults = {
      movies: dataMovie.results,
      series: dataSerie.results,
    };
    setMovies(combinedResults);
    console.log(combinedResults);
  }

  useEffect(() => {
    const searchQueryMovie = `${searchURL}movie?${apiKey}&query=${query}`;
    const searchQuerySerie = `${searchURL}tv?${apiKey}&query=${query}`;
    getMovies(searchQueryMovie, searchQuerySerie);
  }, [query]);

  return (
    <div className={styles.search_container}>
      <h2>Títulos encontrados para: {query}</h2>
      <div>
        <div className={styles.movies_container}>
          {movies.series &&
            movies.series.map((movie) => (
              <Link to={`tv/${movie.id}`}>
                <MovieCard key={movie.id} type={"serie"} movie={movie} />
              </Link>
            ))}
          {movies.movies &&
            movies.movies.map((movie) => (
              <Link to={`movie/${movie.id}`}>
                <MovieCard key={movie.id} type={"movie"} movie={movie} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
