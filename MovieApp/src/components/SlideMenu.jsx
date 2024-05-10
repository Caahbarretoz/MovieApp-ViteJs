import React, { useRef } from "react";
import styles from "./SlideMenu.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";

const SlideMenu = ({ movies, sectionTitle, handleClick, type }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };

  return (
    <div className={styles.movie_section}>
      <h2>{sectionTitle}</h2>
      <div className={styles.movies_container} ref={carouselRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            type={type}
            movie={movie}
            handleClick={() => {
              handleClick(movie);
            }}
          />
        ))}
      </div>

      <button className={styles.prevButton} onClick={scrollLeft}>
        <FaChevronLeft />
      </button>
      <button className={styles.nextButton} onClick={scrollRight}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default SlideMenu;
