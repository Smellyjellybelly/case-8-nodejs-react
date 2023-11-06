import React from "react";
import { useParams } from "react-router-dom";

function MovieDetails({ movies }) {
  // Access the movieid parameter from the URL
  const { movieId } = useParams();

  // Find the selected movie based on the movieid
  const selectedMovie = movies.find((movie) => movie.movieId === parseInt(movieId));

  if (!selectedMovie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <h1>Movie Details</h1>
      <h2>{selectedMovie.title}</h2>
      <p>Duration: {selectedMovie.duration}</p>
      <img src={selectedMovie.picture} alt={selectedMovie.title} />
      <p>{selectedMovie.description}</p>
    </div>
  );
}

export default MovieDetails;
