import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SeatList from '../Items/SeatList';

const Booking = ({ cinemaData }) => {
  const { id } = useParams();
  const showId = parseInt(id, 10);

  // Assuming 'data' comes from your fetched JSON data in App.js
  const show = cinemaData.cinema.movies
    .flatMap(movie => movie.shows)
    .find(show => show.id === showId);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingMessage, setBookingMessage] = useState(null);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const toggleSeatSelection = seatIndex => {
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatIndex)) {
        return prevSelectedSeats.filter(seat => seat !== seatIndex);
      } else {
        return [...prevSelectedSeats, seatIndex];
      }
    });
  };

  const handleBooking = () => {
    if (!show) {
      setBookingMessage("Visning inte hittad.");
      return;
    }
  
    if (selectedSeats.length === 0) {
      setBookingMessage("Du har inte valt någon plats/platser.");
    } else {
      const selectedSeatNumbers = selectedSeats.map(seatIndex => show.seats[seatIndex].seatNumber);
      setBookingMessage(`Du har valt följande plats/platser: ${selectedSeatNumbers.join(', ')}`);
      setPurchaseComplete(true); // Set purchaseComplete to true
    }
  };

  return (
    <div className="booking">
    {show && (
      <>
        <h2>Bokning av {show.room}</h2>
        <div>
          <h3>Lediga Stolar:</h3>
          <SeatList show={show} selectedSeats={selectedSeats} toggleSeatSelection={toggleSeatSelection} />
          <div className='booking-btn'>
            <button onClick={handleBooking}>Boka</button>
            {bookingMessage && <p>{bookingMessage}</p>}
          </div>
          {purchaseComplete && (
            <div>
              <button onClick={() => alert('Tack för ditt köp!')}>Köp</button>
            </div>
          )}
        </div>
      </>
    )}
    {!show && <div>Visning inte hittad</div>}
  </div>
  );
};

export default Booking;
