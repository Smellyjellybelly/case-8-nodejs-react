import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookPage({ showsData, seatingsData, movies }) {
  const { showId } = useParams();

  const [show, setShow] = useState(null);
  const [seating, setSeating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the show based on showId
    const selectedShow = showsData.find((show) => show.showId === parseInt(showId));
    setShow(selectedShow);

    // Find the seating based on showId
    const selectedSeating = seatingsData.find((seating) => seating.showId === parseInt(showId));
    setSeating(selectedSeating);

    // Mark loading as false once data is loaded
    setLoading(false);
  }, [showsData, seatingsData, showId]);

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
        </div>
      )}
      {seating && (
        <div>
          <h2>Seating Information</h2>
          <p>Total Seats: {seating.totalSeats}</p>
          <p>Available Seats: {seating.availableSeats}</p>
        </div>
      )}
      <button>Book Now</button>
    </div>
  );
}

export default BookPage;
