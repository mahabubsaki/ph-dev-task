const { createClient } = require("redis");
const envConfigs = require("./env");





const redisClient = createClient({
    url: envConfigs.redisUri
});


redisClient.on('error', (err) => {
    console.log('Redis Err', err);
});

redisClient.on('connect', () => {
    console.log('Redis Connected');
});


module.exports = redisClient;