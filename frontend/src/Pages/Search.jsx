import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Search({ movies }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    // Filter movies based on the search term
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  return (
    <div className="search-cont">
      <div className="search">
        <input
          type="text"
          placeholder="Sök"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <ul>
          
          {filteredMovies.map((movie) => (
            <li key={movie.movieId}>
              <div>
              <h2>{movie.title}</h2>
              <Link to={`/Moviedetails/${movie.movieId}`}>
                <img src={movie.picture} alt={movie.title} />
              </Link>
              </div>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  );
}

export default Search;
