import React from "react";
import "./MovieCard.css";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MovieCard = ({ title, poster_path }) => (
  <div>
    <div className="movie-card">
      <img src={IMG_API + poster_path} alt={title} />
    </div>
  </div>
);

export default MovieCard;
