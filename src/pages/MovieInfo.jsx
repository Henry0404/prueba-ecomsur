import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./MovieInfo.css";

const MovieInfo = () => {
  let { id } = useParams();
  const DETAILS_API = `https://api.themoviedb.org/3/movie/${id}?api_key=1da48e805af517fba6d070afd009c23c`;
  const SIMILAR_API = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1da48e805af517fba6d070afd009c23c&page=1`;
  const VIDEOS_API = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1da48e805af517fba6d070afd009c23c`;
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    setMovie(null);

    getMovieDetails();
  }, [id]);

  const getMovieDetails = async () => {
    const response = await axios.get(DETAILS_API);
    await getMovieSimilar();
    await getMovieVideos();

    setMovie(response.data);
  };

  const getMovieSimilar = async () => {
    const response = await axios.get(SIMILAR_API);

    setSimilar(response.data.results);
  };

  const getMovieVideos = async () => {
    const response = await axios.get(VIDEOS_API);

    console.log(response.data.results);

    setVideo(response.data.results);
  };

  return (
    <>
      {movie === null && <h1>Cargando...</h1>}
      {movie !== null && (
        <div className="movie-info">
          <div className="info-container">
            <MovieCard {...movie} />
            <div className="info">
              <h1>{movie.title}</h1>
              <p>{movie.release_date}</p>
              <p>Votos: {movie.vote_count}</p>
              <h3>Género</h3>
              <div className="genres">
                <p>
                  {movie.genres.map((genre, i) => {
                    return <span key={i}>{`${genre.name} `}</span>;
                  })}
                </p>
              </div>
              <h3>VISTA GENERAL</h3>
              <p>{movie.overview}</p>
            </div>
          </div>

          {movie.video && (
            <div className="video">
              <h2>TRAILER</h2>
              <div>
                <h1>
                  <strong>VIDOS NOSE QUE PONER</strong>
                </h1>
              </div>
            </div>
          )}

          {similar.length > 0 && (
            <div className="similar">
              <h2>SIMILARES</h2>
              <div className="suggested-movies d-flex justify-center">
                {similar.slice(0, 3).map((recommendation, i) => (
                  <Link
                    key={recommendation.id}
                    to={`/movie/${recommendation.id}`}
                  >
                    <MovieCard {...recommendation} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MovieInfo;
