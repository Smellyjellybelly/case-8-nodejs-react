import React from "react";

function Search({ movies }) {
    return (
      <div className="search-cont">
        <div className="search">
       
          <h1>Movie List</h1>
          <ul>
            {movies.map((movie) => (
              <li key={movie.movieid}>
                <h2>{movie.title}</h2>
                <p>Duration: {movie.duration}</p>
                <img src={movie.picture} alt={movie.title} />
                <p>{movie.description}</p>
              </li>
            ))}
         </ul>
        </div> 
      </div>
    )
  }
  export default Search;


