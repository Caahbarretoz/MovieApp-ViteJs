import { Link } from "react-router-dom";
const MovieImg = import.meta.env.VITE_IMG;
import { FaStar } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie, onshow = true }) => {
  return (
    <div className="container">
      <img src={`${MovieImg}${movie.poster_path}`} alt="MovieImg" />
      <h1>{movie.title}</h1>
      <p>
        <FaStar /> {movie.vote_average.toFixed(1)}
      </p>
      {onshow && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
