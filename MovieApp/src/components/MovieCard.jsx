import { Link } from "react-router-dom";
const MovieImg = import.meta.env.VITE_IMG;
import { FaStar } from "react-icons/fa";
import styles from "./MovieCard.module.css";

const MovieCard = ({ handleClick, type, movie }) => {
  return (
    <div className={styles.container} onClick={handleClick} tabIndex="0">
      <div className={styles.container_img}>
        {type == "movie" && (
          <img src={`${MovieImg}${movie.poster_path}`} alt="MovieImg" />
        )}
        {type == "serie" && (
          <img src={`${MovieImg}${movie.poster_path}`} alt="MovieImg" />
        )}
      </div>
      <div className={styles.container_title}>
        {type == "movie" && <h1>{movie.title}</h1>}
        {type == "serie" && <h1>{movie.name}</h1>}
      </div>
    </div>
  );
};

export default MovieCard;
