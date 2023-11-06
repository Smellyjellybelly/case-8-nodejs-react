import React from 'react';
import { Link } from 'react-router-dom';

function Showing({ showsData, movies }) {
  return (
    <div className="showing-container">
      <h1>Showing Schedule</h1>
      <ul>
        {showsData?.map((show) => {
          const movie = movies.find((movie) => movie.movieId === show.movieId);
          return (
            <li key={show.showId}>
              {movie && (
                <Link to={`/bookpage?showId=${show.showId}&movieId=${movie.movieId}`}>
                  <h2>{movie.title}</h2>
                </Link>
              )}
              <p>Show ID: {show.showId}</p>
              <p>Show Time: {show.showTime}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Showing;
