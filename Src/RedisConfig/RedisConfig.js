const Redis = require("ioredis");

const redis = new Redis({
  host: "localhost",
  port: 6379,
  db: 0,
  password: "",
});

module.exports = redis;
