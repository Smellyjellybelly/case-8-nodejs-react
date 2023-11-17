const fs = require('fs').promises;
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

module.exports = {
    getBookingsFromDB,
    setBookingsFromDB
};
