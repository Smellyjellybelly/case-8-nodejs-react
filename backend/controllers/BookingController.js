const fs = require('fs').promises;
const { getUsersFromDB, setUsersFromDB } = require('../models/utils');
const BookingModel = require("../models/BookingsModel");
const MovieModel = require("../models/MoviesModel");

async function createBooking(movieId, showId, bookingTime, userName, userEmail, selectedSeats) {
    try {
        const bookings = await BookingModel.getBookingsFromDB();
        const showDetails = await MovieModel.getShowDetails(movieId, showId);

        if (!showDetails) {
            throw new Error('Show not found');
        }

        const bookedSeats = showDetails.seats.filter(seat => selectedSeats.includes(seat.seatNumber) && seat.booked);

        if (bookedSeats.length > 0) {
            throw new Error(`Seats ${bookedSeats.map(seat => seat.seatNumber).join(', ')} already booked`);
        }

        const user = getUsersFromDB().find(u => u.name === userName && u.email === userEmail);

        if (!user) {
            throw new Error('User not found');
        }

        const newBooking = {
            bookingId: bookings.length + 1,
            userId: user.userId,
            movieId,
            showId,
            bookingTime,
            name: userName,
            email: userEmail,
            selectedSeats,
        };

        bookings.push(newBooking);
        await setBookingsFromDB(bookings);

        user.bookings.push(newBooking);
        await setUsersFromDB(users);

        return {
            booking: {
                movieId,
                showId,
                bookingTime,
                userName,
                userEmail,
                selectedSeats
            },
            message: 'Booking created successfully'
        };
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error; 
    }
}

function handleCreateBooking(req, res) {
    const { movieId, showId, bookingTime, name, email, selectedSeats } = req.body;

    console.log("Request Body:", req.body);

    const newBooking = createBooking(movieId, showId, bookingTime, name, email, selectedSeats);

    res.json(newBooking);
}

module.exports = {
    handleCreateBooking,
};
