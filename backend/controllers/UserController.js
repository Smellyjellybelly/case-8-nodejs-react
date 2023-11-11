const crypto = require("crypto");
const UserModel = require("../models/UserModel");

const userSessions = {};

function handleSignIn(req, res) {
    const { username, password } = req.body;

    console.log("Received Sign In Request:", username, password);

    const isAuthenticated = UserModel.authenticate(username, password);

    if (!isAuthenticated) {
        console.log("Signin failed");
        return res.status(401).send("Not authenticated");
    }


    // Register a new session
    const sessionKey = crypto.randomBytes(20).toString('base64');
    userSessions[username] = sessionKey;

    
    // Return a success message
    return res.json({ message: "Signin successful", sessionKey });

    res.send({ sessionKey, username });
}

function handleGetAllUsers(req, res) {
    const allUsers = UserModel.getAllUsers();

    return res.send(allUsers);
}


function handleGetUserByUsername(req, res) {

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

// const jwt = require("jsonwebtoken");
// const { secretKey, authenticatewebToken } = require("../models/authenticate.js");

// const Users = require("../models/");
// const users = new Users();

// function handleSignIn(req, res) {
//     const name = req.body.name;
//     const password = req.body.password;
//     const user = users.login(name, password);

//     if (user.hasOwnProperty("id")) {
//         const token = jwt.sign({ user }, secretKey, { expiresIn: '1h'});
//         res.json({user: user, token: token}) ;
//     } else {
//         res.json({})
//     }
// }

// module.exports = {
//     handleSignIn
// }