const redis = require('redis');

const client = redis.createClient({ expire: 1800000 });

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => await client.connect())();

module.exports = client;