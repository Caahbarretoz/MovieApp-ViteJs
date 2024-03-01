import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  }

  useEffect(() => {
    const searchQuery = `${searchURL}?${apiKey}&query=${query}`;
    getMovies(searchQuery);
  }, [query]);

  return (
    <div className="home_container">
      <h1 className="search_title">Títulos encontrados para: {query}</h1>
      <div className="movies_container">
        {movies.length > 0 &&
          movies.map((movie) => (
            <div>
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
