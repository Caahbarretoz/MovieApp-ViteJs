import React, { useState, useRef } from "react";
import styles from "./SlideMenu.module.css"; // Importe o arquivo CSS Module para estilização
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importe os ícones de seta

const Carousel = ({ movies, sectionTitle, handleClick }) => {
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
            movie={movie}
            handleClick={() => handleClick}
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

export default Carousel;
