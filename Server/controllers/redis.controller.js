/* 
Connect to redis and return an instance of redis client
*/

/*
https://openbase.com/js/ioredis
*/

const Redis = require("ioredis");

// configs
const port = process.env.REDIS_PORT;
const host = process.env.REDIS_HOST;
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;
const db = 0;

// redis client
const client = new Redis({ port, host, username, password, db });

module.exports = client;
