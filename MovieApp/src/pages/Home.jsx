import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Home.css";
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  async function getTopRatedMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  }

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?language=pt-BR&${apiKey}`;
    getTopRatedMovies(topRatedUrl);
  }, []);

  console.log(topMovies);

  return (
    <div className="home_container">
      <h2>Melhores filmes:</h2>
      <div className="movies_container">
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
