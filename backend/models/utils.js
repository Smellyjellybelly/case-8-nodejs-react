const fs = require("fs");

const USERS_DB_PATH = "db/users.json";
const MOVIES_DB_PATH = "db/movies.json";
const BOOKING_DB_PATH = "db/bookings.json";

function getUsersFromDB() {
    const dbData = fs.readFileSync(USERS_DB_PATH, {encoding: "utf-8"});
    return JSON.parse(dbData);
}

function setUsersFromDB(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync(USERS_DB_PATH, str);
}

function getMovieFromDB() {
    const dbdata = fs.readFileSync(MOVIES_DB_PATH, {encoding: "utf-8"});
    return JSON.parse(dbdata);
}

function setMovieFromDB(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync(MOVIES_DB_PATH, str);
}

function getBookingsFromDB() {
    const dbdata = fs.readFileSync(BOOKING_DB_PATH, {encoding: "utf-8"});

    if (!dbdata.trim()) {
        // If the file is empty, return an empty array
        return [];
    }

    console.log("Content of bookings.json:", dbdata); // Log content before parsing

    return JSON.parse(dbdata);
}

function setBookingsFromDB(data) {
    const str = JSON.stringify({ bookings: data});
    fs.writeFileSync(BOOKING_DB_PATH, str);

    console.log("Content written to bookings.json:", str); 
}

module.exports = {
    getUsersFromDB,
    setUsersFromDB,
    getMovieFromDB,
    setMovieFromDB,
    getBookingsFromDB,
    setBookingsFromDB
}