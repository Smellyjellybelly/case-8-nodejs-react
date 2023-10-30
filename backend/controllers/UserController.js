const crypto = require("crypto");
const UserModel = require("../models/UserModel");

const userSessions = {};

function handleSignIn(req, res) {
    const { username, password } = req.body;

    const isAuthenticated = UserModel.authenticate(username, password);

    if (!isAuthenticated) {
        console.log("Signin failed");
        return res.status(401).send("Not authenticated");
    }

    // Register a new session
    const sessionKey = crypto.randomBytes(20).toString('base64');
    userSessions[username] = sessionKey;

    res.send({ sessionKey });
}

function handleGetAllUsers(req, res) {
    const allUsers = UserModel.getAllUsers();

    return res.send(allUsers);
}


function handleGetUserByUsername(req, res) {
    if (!Object.values(userSessions).includes(req.query.sessionKey)) {
        return res.status(401).send("Not authorized");
    }

    const { username } = req.params;
    
    if (!Object.values(userSessions).includes(req.query.sessionKey)) {
        return res.status(401).send("Not authorized");
    }



    const foundUser = UserModel.getUserByUsername(username);

    if (!foundUser) {
        return res.status(404).send("User Not found");
    }

    return res.send(foundUser);
}

module.exports = {
    userSessions,
    handleGetAllUsers,
    handleGetUserByUsername,
    handleSignIn
}