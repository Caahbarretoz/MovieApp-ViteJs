import { Link } from "react-router-dom";
const MovieImg = import.meta.env.VITE_IMG;
import { FaStar } from "react-icons/fa";
import styles from "./MovieCard.module.css";

const MovieCard = ({ handleClick, movie, serie, onshow = true }) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.container_img}>
        {movie && (
          <img src={`${MovieImg}${movie.poster_path}`} alt="MovieImg" />
        )}
        {serie && (
          <img src={`${MovieImg}${serie.poster_path}`} alt="MovieImg" />
        )}
      </div>
      <div className={styles.container_title}>
        {movie && <h1>{movie.title}</h1>}
        {serie && <h1>{serie.name}</h1>}
      </div>
    </div>
  );
};

export default MovieCard;
