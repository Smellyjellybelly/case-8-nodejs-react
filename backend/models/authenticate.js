const jwt = require('jsonwebtoken');

const secretKey = "secret-key-randomized-string";

function authenticatewebToken(req, res, next) {
    const tokn = req.header('Authentization');
    if (!token) return res.status(401).json({result: 'Access denied'});

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({result: 'Invalid token'});
        req.user = user;
        next();
    });
}

module.exports = {
    secretKey,
    authenticatewebToken
}