import { useEffect, useState } from "react";
import SlideMenu from "../components/SlideMenu";
import styles from "./Home.module.css";
const moviesURL = import.meta.env.VITE_API;
const seriesURL = import.meta.env.VITE_API_SERIES;
const movieBackdrop = import.meta.env.VITE_BACKDROP;
const apiKey = import.meta.env.VITE_API_KEY;
import { FaStar } from "react-icons/fa";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState("");
  const [whatSelected, setWhatSelected] = useState("");

  const [isSelected, setIsSelected] = useState(false);
  const [selectedMovieOverview, setSelectedMovieOverview] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [selectedMovieAvarage, setSelectedMovieAvarage] = useState("");
  const [selectedMovieRelease, setSelectedMovieRelease] = useState("");

  async function getTopRatedMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  }

  async function getPopularMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    setPopularMovies(data.results);
  }

  async function getTrendingMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    setTrendingMovies(data.results);
  }

  async function getTopRatedSeries(url) {
    const res = await fetch(url);
    const data = await res.json();
    setTopSeries(data.results);
  }

  async function getPopularSeries(url) {
    const res = await fetch(url);
    const data = await res.json();
    setPopularSeries(data.results);
  }

  async function getTrendingSeries(url) {
    const res = await fetch(url);
    const data = await res.json();
    setTrendingSeries(data.results);
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

    const popularMoviesUrl = `${moviesURL}popular?language=pt-BR&${apiKey}`;
    getPopularMovies(popularMoviesUrl);

    const topRatedSeriesUrl = `${seriesURL}top_rated?language=pt-BR&${apiKey}`;
    getTopRatedSeries(topRatedSeriesUrl);

    const popularSeriesUrl = `${seriesURL}popular?language=pt-BR&${apiKey}`;
    getPopularSeries(popularSeriesUrl);

    const trendingSeriesUrl = `https://api.themoviedb.org/3/trending/tv/day?language=pt-BR&${apiKey}`;
    getTrendingSeries(trendingSeriesUrl);

    const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?language=pt-BR&${apiKey}`;
    getTrendingMovies(trendingMoviesUrl);
  }, []);

  useEffect(() => {
    // Verifica se há algum filme na lista topMovies
    if (topMovies.length > 0) {
      setSelectedMovie(`${topSeries[0].backdrop_path}`);
      setSelectedMovieTitle(`${topSeries[0].name}`);
      setSelectedMovieAvarage(`${topSeries[0].vote_average.toFixed(1)}`);
      setSelectedMovieRelease(`${topSeries[0].first_air_date.substring(0, 4)}`);
      setSelectedMovieOverview(`${topSeries[0].overview}`);
    }
  }, [topSeries]);

  return (
    <div className={styles.home_container}>
      <div className={styles.backdrop}>
        {isSelected == false ? (
          <div className={styles.movie_info}>
            <h1>{selectedMovieTitle}</h1>
            <div className={styles.span_info}>
              <span>
                <FaStar />
                {selectedMovieAvarage}
              </span>
              <span>{selectedMovieRelease}</span>
            </div>
            <p>{selectedMovieOverview}</p>
            <img src={`${movieBackdrop}${selectedMovie}`} alt="MovieImg" />
          </div>
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
        <SlideMenu
          type={"serie"}
          movies={topSeries}
          sectionTitle={"Melhores Séries"}
          handleClick={handleClickSerie}
        />

        <SlideMenu
          type={"serie"}
          movies={popularSeries}
          sectionTitle={"Séries Populares"}
          handleClick={handleClickSerie}
        />

        <SlideMenu
          type={"serie"}
          movies={trendingSeries}
          sectionTitle={"Séries em Alta"}
          handleClick={handleClickSerie}
        />

        <SlideMenu
          type={"movie"}
          movies={topMovies}
          sectionTitle={"Melhores Filmes"}
          handleClick={handleClickMovie}
        />

        <SlideMenu
          type={"movie"}
          movies={popularMovies}
          sectionTitle={"Filmes Populares"}
          handleClick={handleClickMovie}
        />

        <SlideMenu
          type={"movie"}
          movies={trendingMovies}
          sectionTitle={"Filmes em Alta"}
          handleClick={handleClickMovie}
        />
      </div>
    </div>
  );
};

export default Home;
