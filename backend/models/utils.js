const fs = require("fs");

const USERS_DB_PATH = "db/users.json";

function getUsersFromDB() {
    const dbData = fs.readFileSync(USERS_DB_PATH, {encoding: "utf-8"});
    return JSON.parse(dbData);
}

function setUsersFromDB(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync(USERS_DB_PATH, str);
}

module.exports = {
    getUsersFromDB,
    setUsersFromDB
}