const passport = require('passport');

module.exports = (req, res, next) => {

    // Cities for Forecast component
    if((req.query.lat == 39.7437902 && req.query.lon == -8.8071119) || req.query.cityid == 2267094) return next();
    if((req.query.lat == 38.7077507 && req.query.lon == -9.1365919) || req.query.cityid == 2267056) return next();
    if((req.query.lat == 40.2111931 && req.query.lon == -8.4294632) || req.query.cityid == 2740636) return next();
    if((req.query.lat == 41.1494512 && req.query.lon == -8.6107884) || req.query.cityid == 2735941) return next();
    if((req.query.lat == 37.0162727 && req.query.lon == -7.9351771) || req.query.cityid == 2268337) return next();

    if(req.user){
        next();
    } else{
        return res.status(401).send({ error: 'User not authenticated' });
    }
}