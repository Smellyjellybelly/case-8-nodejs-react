const fs = require("fs");

const USERS_DB_PATH = "db/users.json";
const MOVIES_DB_PATH = "db/movies.json";


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


module.exports = {
    getUsersFromDB,
    setUsersFromDB,
    getMovieFromDB,
    setMovieFromDB
}