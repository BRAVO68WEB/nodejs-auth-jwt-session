const jwt = require('jsonwebtoken')
const redis_client = require('../helpers/redis_connect')
const fs = require('fs')

const privateKey = fs.readFileSync('jwtRS256.key')

function GenerateAccessToken(user_id) {
    let userData = {
        tokenType: 'access_token',
        user: user_id,
    }
    return jwt.sign(userData, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1d',
    })
}

function GenerateRefreshToken(user_id) {
    const setReferesh = {
        tokenType: 'refresh_token',
        user: user_id,
    }
    const refresh_token = jwt.sign(setReferesh, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d',
    })

    redis_client.set(
        setReferesh.user.toString(),
        JSON.stringify({
            token: refresh_token,
        })
    )
    return refresh_token
}

module.exports = {
    GenerateAccessToken,
    GenerateRefreshToken,
}
