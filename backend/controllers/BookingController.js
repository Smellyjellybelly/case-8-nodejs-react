const BookingModel = require("../models/BookingsModel");

function handleCreateBooking(req, res) {
    const { movieId, showId, bookingTime, name, email } = req.body;

    console.log("Request Body:", req.body);

    const newBooking = BookingModel.createBooking(movieId, showId, bookingTime, name, email);

    res.json(newBooking);
}

module.exports = {
    handleCreateBooking,
};