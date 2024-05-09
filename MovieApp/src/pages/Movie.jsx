import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import styles from "./Movie.module.css";
import { PiTimer } from "react-icons/pi";
import { FiActivity } from "react-icons/fi";
import { RxCalendar } from "react-icons/rx";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  }

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?language=pt-BR&${apiKey}`;
    getMovie(movieUrl);
  }, []);

  return (
    <div className={styles.movie_container}>
      {movie && (
        <div className={styles.movie_card}>
          <MovieCard key={movie.id} movie={movie} onshow={false} />
          <p>{movie.overview}</p>
          <h3>
            <PiTimer />
            Duração: {movie.runtime}
          </h3>
          <h3>
            <FiActivity />
            Popularidade: {movie.popularity}
          </h3>
          <h3>
            <RxCalendar />
            Lançado em: {movie.release_date}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Movie;
