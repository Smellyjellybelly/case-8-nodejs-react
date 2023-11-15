const { getUsersFromDB } = require("./utils");

function authenticate(name, password) {
    const allUsers = getUsersFromDB();
    // check if username exists
    const foundUser = allUsers.find(user => user.name === name);

    if (!foundUser) {
        return false;
    }

    const isMatching = foundUser.password === password;

    return isMatching;
}

function getAllUsers() {
    const allUsers = getUsersFromDB();

    // protect the password
    allUsers.forEach(users => delete users.password);

    return allUsers;
}

function getUserByUsername(name) {
    const allUsers = getUsersFromDB();

    const foundUser = allUsers.find(user => user.name === name);

     // protect password
     delete foundUser.password;

    return foundUser;
}


module.exports = {
    getAllUsers,
    getUserByUsername,
    authenticate
}