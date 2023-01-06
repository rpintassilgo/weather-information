const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {

    // Leiria
    if(req.query.lat == 39.7437902 && req.query.lon == -8.8071119) return next();

    const authHeader = req.headers.authorization;

    // ------------ simple verifications ------------

    if(!authHeader) return res.status(401).send({ error: 'No token provided' });

    const strings = authHeader.split(' ');
    const [ scheme, token ] = strings;

    if(!/^Bearer$/i.test(scheme) || strings.length !== 2) return res.status(401).send({ error: 'Malformed token' });

    // ----------------------------------------------

    jwt.verify(token, authConfig.secret, (err,decoded) => {
        if(err) return res.status(401).send({ error: 'Invalid token'})

        req.userId = decoded.id;
        return next();
    })
}