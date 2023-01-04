const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/glartek', { useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;