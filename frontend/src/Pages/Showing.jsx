// Import necessary hooks and components from React and react-router-dom
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Define a utility function to find a show by its ID in the cinemaData
export const findShowById = (showId, cinemaData) => {
  // Loop through each movie in cinemaData
  for (const movie of cinemaData.cinema.movies) {
    // Loop through each show in the current movie
    for (const show of movie.shows) {
      // If the current show's ID matches the required showId, return the show
      if (show.id === showId) {
        return show;
      }
    }
  }
  // If no show is found with the given showId, return undefined
  return undefined;
};

// Define the Showing component
const Showing = ({ cinemaData }) => {
  // Define state for storing the IDs of selected shows with an initial empty array
  const [selectedShowIds, setSelectedShowIds] = useState([]);
  // Create a history object to navigate to different routes programmatically
  const history = useHistory();

  // Define an effect that runs when cinemaData changes
  useEffect(() => {
    // If cinemaData and cinemaData.movies are available, initialize selectedShowIds 
    if (cinemaData && cinemaData.cinema.movies) {
      setSelectedShowIds(Array(cinemaData.cinema.movies.length).fill(''));
    }
  }, [cinemaData]); // cinemaData is a dependency for this effect

  // If cinemaData or cinemaData.movies is not available, render a loading message
  if (!cinemaData || !cinemaData.cinema.movies) return <div>Loading...</div>;

  // Define a function to count available seats in a show
  const getAvailableSeatCount = (show) => {
    // If show or show.seats is not available, return 0
    if (!show || !show.seats) return 0;
    // Filter unbooked seats and return their count
    return show.seats.filter((seat) => !seat.booked).length;
  };

  // Define a function to redirect to the booking page for the selected show of a movie
  const redirectToBooking = (movieIndex) => {
    // Find the selected show ID for the given movieIndex
    const selectedShowId = selectedShowIds[movieIndex];
    // If a show is selected, navigate to its booking page
    if (selectedShowId) {
      history.push(`/Booking/${selectedShowId}`);
    }
  };

  // Define a function to handle show selection
  const handleShowSelect = (e, movieIndex) => {
    // Create a new array to store updated selectedShowIds
    const newSelectedShowIds = [...selectedShowIds];
    // Update the selected show ID for the given movieIndex
    newSelectedShowIds[movieIndex] = e.target.value;
    // Set the updated selectedShowIds to state
    setSelectedShowIds(newSelectedShowIds);
  };

  // Render the component
  return (
    <div>
      <h2>MOVIES</h2>
      <ul className="movie-show">
        {/* Map through each movie in cinemaData.movies and render list items */}
        {cinemaData.cinema.movies.map((movie, index) => (
          <li key={index}>
            {/* Render the movie picture with alt text as movie title */}
            <img src={movie.picture} alt={movie.title} />
            {/* Render the movie title and duration */}
            <h3>{movie.title}</h3>
            <p>Längd: {movie.duration}</p>
            <h4>Visningar:</h4>
            {/* Render a select element to choose from available shows */}
            <select
              id={`showSelector-${index}`}
              onChange={(e) => handleShowSelect(e, index)}
              value={selectedShowIds[index]}
            >
              <option value="">Välj en visning</option>
              {/* Map through each show in movie.shows and render option elements */}
              {movie.shows.map((show, showIndex) => (
                <option key={showIndex} value={show.id}>
                  {/* Render show details */}
                  Visning: {show.time}, Rum: {show.room}, Lediga platser: {getAvailableSeatCount(show)}
                </option>
              ))}
            </select>
            {/* Render a button to book the selected show */}
            <button onClick={() => redirectToBooking(index)}>Boka</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the Showing component as default export
export default Showing;