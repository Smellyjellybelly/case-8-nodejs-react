const { getBookingsFromDB, setBookingsFromDB } = require("./utils");

function createBooking(movieId, showId, bookingTime, user, email) {
    const bookings = getBookingsFromDB();
    const newBooking = {
        bookingId: bookings.length + 1,
        movieId,
        showId,
        bookingTime,
        user,
        email,
    };

    bookings.push(newBooking);
    setBookingsFromDB(bookings);

    return newBooking;
}

module.exports = {
    createBooking
}