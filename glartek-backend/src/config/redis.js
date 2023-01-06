const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

try {
    (async () => await client.connect())();
} catch (error) {
    console.log("Redis connection error: " + error);
}

module.exports = client;