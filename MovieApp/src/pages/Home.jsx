import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import styles from "./Home.module.css";
const moviesURL = import.meta.env.VITE_API;
const seriesURL = import.meta.env.VITE_API_SERIES;
const movieBackdrop = import.meta.env.VITE_BACKDROP;
const apiKey = import.meta.env.VITE_API_KEY;
import { FaStar } from "react-icons/fa";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState("");
  const [whatSelected, setWhatSelected] = useState("");

  const [isSelected, setIsSelected] = useState(false);
  const [selectedMovieOverview, setSelectedMovieOverview] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");

  async function getTopRatedMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  }

  async function getTopRatedSeries(url) {
    const res = await fetch(url);
    const data = await res.json();
    setTopSeries(data.results);
  }

  function handleClickMovie(movie) {
    setSelectedMovie(movie);
    setIsSelected(true);
    setWhatSelected("movie");
  }

  function handleClickSerie(serie) {
    setSelectedMovie(serie);
    setIsSelected(true);
    setWhatSelected("serie");
  }

  useEffect(() => {
    const topRatedMoviesdUrl = `${moviesURL}top_rated?language=pt-BR&${apiKey}`;
    getTopRatedMovies(topRatedMoviesdUrl);
    const topRatedSeriesUrl = `${seriesURL}top_rated?language=pt-BR&${apiKey}`;
    getTopRatedSeries(topRatedSeriesUrl);
  }, []);

  useEffect(() => {
    // Verifica se há algum filme na lista topMovies
    if (topMovies.length > 0) {
      setSelectedMovie(`${topMovies[0].backdrop_path}`);
      setSelectedMovieTitle(`${topMovies[0].title}`);
    }
  }, [topMovies]);

  return (
    <div className={styles.home_container}>
      <div className={styles.backdrop}>
        {isSelected == false ? (
          <>
            <h1>{selectedMovieTitle}</h1>
            <img src={`${movieBackdrop}${selectedMovie}`} alt="MovieImg" />
          </>
        ) : whatSelected == "movie" ? (
          <div className={styles.movie_info}>
            <h1>{selectedMovie.title}</h1>
            <div className={styles.span_info}>
              <span>
                <FaStar />
                {selectedMovie.vote_average.toFixed(1)}
              </span>
              <span>{selectedMovie.release_date.substring(0, 4)}</span>
            </div>
            <p>{selectedMovie.overview}</p>
            <img
              src={`${movieBackdrop}${selectedMovie.backdrop_path}`}
              alt="MovieImg"
            />
          </div>
        ) : (
          <div className={styles.movie_info}>
            <h1>{selectedMovie.name}</h1>
            <div className={styles.span_info}>
              <span>
                <FaStar />
                {selectedMovie.vote_average.toFixed(1)}
              </span>
              <span>{selectedMovie.first_air_date.substring(0, 4)}</span>
            </div>
            <p>{selectedMovie.overview}</p>
            <img
              src={`${movieBackdrop}${selectedMovie.backdrop_path}`}
              alt="MovieImg"
            />
          </div>
        )}
      </div>

      <div className={styles.content_container}>
        <div className={styles.topseries_section}>
          <h2>Melhores Series</h2>
          <div className={styles.movies_container}>
            {topSeries.length > 0 &&
              topSeries.map((serie) => (
                <MovieCard
                  key={serie.id}
                  serie={serie}
                  handleClick={() => handleClickSerie(serie)}
                />
              ))}
          </div>
        </div>

        <div className={styles.movie_section}>
          <h2>Melhores Filmes</h2>
          <div className={styles.movies_container}>
            {topMovies.length > 0 &&
              topMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  handleClick={() => handleClickMovie(movie)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
