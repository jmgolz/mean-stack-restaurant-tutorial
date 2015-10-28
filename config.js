var config = {};

config.mongoUri = 'mongodb://localhost:27017/rtr'; //the rtr trailing piece names a database called "rtr"
config.cookieMaxAge = 30 * 24 * 3600 * 1000;
module.exports = config;