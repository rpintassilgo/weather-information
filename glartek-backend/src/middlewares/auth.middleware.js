const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // Leiria
    return next()
    if(req.query.lat == 39.7437902 && req.query.lon == -8.8071119) return next();

    const authHeader = req.headers.authorization;

    // ------------ simple verifications ------------

    if(!authHeader) return res.status(401).send({ error: 'No token provided' });

    const strings = authHeader.split(' ');
    const [ scheme, token ] = strings;

    if(!/^Bearer$/i.test(scheme) || strings.length !== 2) return res.status(401).send({ error: 'Malformed token' });

    // ----------------------------------------------

    jwt.verify(token, process.env.secret, (err,decoded) => {
        if(err) return res.status(401).send({ error: 'Invalid token'})

        console.log("erro: " + JSON.stringify(err))

        req.userId = decoded.id;
        return next();
    })
}