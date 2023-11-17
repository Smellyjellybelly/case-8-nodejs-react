const fs = require("fs").promises;

const USERS_DB_PATH = "db/users.json";
const MOVIES_DB_PATH = "db/movies.json";

async function getUsersFromDB() {
    try {
        const dbData = await fs.readFile(USERS_DB_PATH, { encoding: "utf-8" });
        return JSON.parse(dbData);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
}

async function setUsersFromDB(data) {
    try {
        const str = JSON.stringify(data);
        await fs.writeFile(USERS_DB_PATH, str);
    } catch (error) {
        console.error('Error writing to users file:', error);
        throw error;
    }
}

async function getMovieFromDB() {
    try {
        const dbData = await fs.readFile(MOVIES_DB_PATH, { encoding: "utf-8" });
        return JSON.parse(dbData);
    } catch (error) {
        console.error('Error reading movies file:', error);
        return [];
    }
}

async function setMovieFromDB(data) {
    try {
        const str = JSON.stringify(data);
        await fs.writeFile(MOVIES_DB_PATH, str);
    } catch (error) {
        console.error('Error writing to movies file:', error);
        throw error;
    }
}

module.exports = {
    getUsersFromDB,
    setUsersFromDB,
    getMovieFromDB,
    setMovieFromDB
};
