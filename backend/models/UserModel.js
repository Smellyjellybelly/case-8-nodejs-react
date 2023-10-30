const { getUsersFromDB } = require("./utils");

function authenticate(username, password) {
    const allUsers = getUsersFromDB();
    // check if username exists
    const foundUser = allUsers.find(user => user.username === username);

    if (!foundUser) {
        return false;
    }

    const isMatching = foundUser.password === password;

    return isMatching;
}



function getAllUsers() {
    const allUsers = getUsersFromDB();

    // protect the password
    allUsers.forEach(user => delete user.password);

    return allUsers;
}

function getUserByUsername(username) {
    const allUsers = getUsersFromDB();

    const foundUser = allUsers.find(user => user.username === username);

     // protect password
     delete foundUser.password;

    return foundUser;
}


module.exports = {
    getAllUsers,
    getUserByUsername,
    authenticate
}