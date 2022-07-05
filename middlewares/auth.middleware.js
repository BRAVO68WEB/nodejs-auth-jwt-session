const jwt = require('jsonwebtoken')
const redis_client = require('../helpers/redis_connect')
const fs = require('fs')
const publicKey = fs.readFileSync('jwtRS256.key.pub')

function verifyToken(req, _res, next) {
    try {
        // Bearer tokenstring
        if (req.headers.authorization === undefined)
            throw new Error('Invalid request')

        const token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, publicKey)

        if (decoded.tokenType !== 'access_token')
            throw new Error('Invalid token')

        req.userData = decoded

        req.token = token

        // verify blacklisted access token.
        redis_client.get('BL_' + decoded.user.toString(), (err, data) => {
            if (err) throw err

            if (data === token) throw new Error('Blacklisted token')
            next()
        })
    } catch (error) {
        next(error)
    }
}

function verifyRefreshToken(req, _res, next) {
    const token = req.body.token

    if (token === null) throw new Error('Invalid request')
    try {
        const decoded = jwt.verify(token, publicKey)
        req.userData = decoded
        if (decoded.tokenType !== 'refresh_token')
            throw new Error('Invalid token.')
        // verify if token is in store or not
        redis_client.get(decoded.user.toString(), (err, data) => {
            if (err) throw err

            if (data === null)
                throw new Error('Invalid request :- Token is not in store')
            if (JSON.parse(data).token != token)
                throw new Error('Invalid request :- Token is not in store')

            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    verifyToken,
    verifyRefreshToken,
}
