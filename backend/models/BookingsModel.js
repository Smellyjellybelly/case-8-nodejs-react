const fs = require('fs').promises;
const { getUsersFromDB, setUsersFromDB } = require('./utils');
const BOOKING_DB_PATH = "db/bookings.json";

async function getBookingsFromDB() {
    try {
        const dbData = await fs.readFile(BOOKING_DB_PATH, { encoding: 'utf-8' });
        return JSON.parse(dbData);
    } catch (error) {
        console.error('Error reading bookings file:', error);
        return [];
    }
}

async function setBookingsFromDB(data) {
    try {
        const str = JSON.stringify({ bookings: data });
        await fs.writeFile(BOOKING_DB_PATH, str);
    } catch (error) {
        console.error('Error writing to bookings file:', error);
        throw error;
    }
}


async function createBooking(movieId, showId, bookingTime, userName, userEmail) {
    try {
        // Read existing users
        const users = await getUsersFromDB();

        // Find the user based on the provided name and email
        const userIndex = users.findIndex(u => u.name === userName && u.email === userEmail);

        if (userIndex === -1) {
            throw new Error('User not found'); // You might want to handle this case appropriately
        }

        // Get the user and their existing bookings
        const user = users[userIndex];
        const bookings = user.bookings || [];

        // Create a new booking object
        const newBooking = {
            bookingId: bookings.length + 1,
            userId: user.userId,
            movieId,
            showId,
            bookingTime,
            name: userName,
            email: userEmail,
        };

        // Append the new booking to the existing bookings
        bookings.push(newBooking);

        // Update the user's bookings
        users[userIndex].bookings = bookings;

        // Save the updated user back to the file
        await setUsersFromDB(users);

        return newBooking;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error; // You might want to handle or log the error appropriately
    }
}

module.exports = {
    createBooking,
    getBookingsFromDB,
    setBookingsFromDB
};
