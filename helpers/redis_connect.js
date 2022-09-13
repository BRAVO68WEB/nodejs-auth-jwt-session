const redis = require('redis')

const redis_client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST
)

redis_client.on('connect', function () {
    console.log('Redis Client connected 🍒')
})

redis_client.on('error', function (err) {
    console.log('Redis error: ' + err)
})

module.exports = redis_client
