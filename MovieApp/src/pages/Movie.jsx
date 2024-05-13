import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Movie.module.css";
import { PiTimer } from "react-icons/pi";
import { FiActivity } from "react-icons/fi";
import { RxCalendar } from "react-icons/rx";
const apiKey = import.meta.env.VITE_API_KEY;
const movieBackdrop = import.meta.env.VITE_BACKDROP;
const MovieImg = import.meta.env.VITE_IMG;

const Movie = () => {
  const { category, id } = useParams();
  const [movie, setMovie] = useState(null);

  async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  }

  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/${category}/${id}?language=pt-BR&${apiKey}`;
    getMovie(movieUrl);
  }, []);

  return (
    <div className={styles.movie_container}>
      {movie && (
        <div className={styles.backdrop_container}>
          <img
            className={styles.backdrop_image}
            src={`${movieBackdrop}${movie.backdrop_path}`}
            alt="MovieImg"
          />
          <div className={styles.movie_card}>
            <div className={styles.movie_cover}>
              <img src={`${MovieImg}${movie.poster_path}`} alt="MovieImg" />
            </div>
            <div className={styles.movie_info}>
              {category == "movie" ? (
                <h1>{movie.title}</h1>
              ) : (
                <h1>{movie.name}</h1>
              )}
              <div className={styles.movie_overview}>
                <h2>Sinopse:</h2>
                <p>{movie.overview}</p>
              </div>

              {category == "movie" ? (
                <h2>
                  <PiTimer />
                  Duração: <span>{movie.runtime} min</span>
                </h2>
              ) : (
                <h2>Temporadas: {movie.number_of_seasons}</h2>
              )}

              <h2>
                <FiActivity />
                Popularidade:<span>{movie.popularity}</span>
              </h2>
              <h2>
                <RxCalendar />
                Lançado em:{" "}
                <span>
                  {category == "movie"
                    ? movie.release_date
                    : movie.first_air_date}
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
