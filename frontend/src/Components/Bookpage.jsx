import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookPage({ showsData, movies }) {
  const { showId } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the show based on showId
    const selectedShow = showsData.find((show) => show.showId === parseInt(showId));
    setShow(selectedShow);

    // Mark loading as false once data is loaded
    setLoading(false);
  }, [showsData, showId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bookpage-container">
      <h1>Booking Details</h1>
      {show && (
        <div>
          <h2>Show ID: {show.showId}</h2>
          <p>Show Time: {show.showTime}</p>
          <p>Movie Title: {movies.find((movie) => movie.movieId === show.movieId)?.title}</p>
          <h2>Seating Information</h2>
          <ul>
            {show.seats.map((seat) => (
              <li key={seat.seatId}>
                Row: {seat.row}, Seat Number: {seat.seatNumber}, {seat.isAvailable ? 'Available' : 'Booked'}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button>Book Now</button>
    </div>
  );
}

export default BookPage;
