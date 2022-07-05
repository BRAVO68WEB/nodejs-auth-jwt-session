const { exists } = require('fs')

module.exports = async (fn) => {
    const notDiffVars = []
    exists('jwtRS256.key', (chk) => {
        if (!chk) {
            throw new Error('Please generate jwtRS256.key ("Private Key")')
        }
    })
    exists('jwtRS256.key.pub', (chk) => {
        if (!chk) {
            throw new Error('Please generate jwtRS256.key.pub ("Public Key")')
        }
    })
    console.log('Development environment detected.')
    ;[
        'JWT_ACCESS_TIME',
        'JWT_REFRESH_TIME',
        'REDIS_PORT',
        'REDIS_HOST',
        'DB_CONN_STRING',
    ].forEach((envVar) => {
        if (process.env[envVar] === undefined) {
            notDiffVars.push(envVar)
        }
    })
    if (notDiffVars.length > 0) {
        throw new Error(`${notDiffVars.join(', ')} is not defined`)
    }
    if (typeof fn === 'function') {
        fn()
    }
}
