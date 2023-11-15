const crypto = require("crypto");
const UserModel = require("../models/UserModel");

const userSessions = {};

function handleSignIn(req, res) {
    const { name, password } = req.body;

    console.log("Received Sign In Request:", name, password);

    const isAuthenticated = UserModel.authenticate(name, password);

    if (!isAuthenticated) {
        console.log("Signin failed");
        return res.status(401).send("Not authenticated");
    }


    // Register a new session
    const sessionKey = crypto.randomBytes(20).toString('base64');
    userSessions[name] = sessionKey;

    
    // Return a success message
    // return res.json({ message: "Signin successful", sessionKey });

    res.send({ sessionKey });
}

function handleGetAllUsers(req, res) {
    const allUsers = UserModel.getAllUsers();

    return res.send(allUsers);
}


function handleGetUserByUsername(req, res) {

    const { name } = req.params;
    
    if (!Object.values(userSessions).includes(req.query.sessionKey)) {
        return res.status(401).send("Not authorized");
    }

    const foundUser = UserModel.getUserByUsername(name);

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
