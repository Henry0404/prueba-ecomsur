import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

const POPULAR_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=1da48e805af517fba6d070afd009c23c&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=1da48e805af517fba6d070afd009c23c&query=";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(POPULAR_API);
  }, []);

  const getMovies = async (API) => {
    const response = await axios.get(API);

    setMovies(response.data.results);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Navbar
        onSubmit={handleOnSubmit}
        onChange={handleOnChange}
        searchTerm={searchTerm}
      />

      <div className="d-flex justify-center">
        {movies.length > 0 &&
          movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard {...movie} />
            </Link>
          ))}
      </div>
    </>
  );
}

export default Home;
