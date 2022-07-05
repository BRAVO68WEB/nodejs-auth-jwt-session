async function notFound(_req, _res, next) {
    try {
        throw new Error('Not Found')
    } catch (err) {
        next(err)
    }
}

async function logErrors(err, _req, _res, next) {
    console.error('\n')
    console.log('------------Error Log------------')
    console.error(err.stack)
    console.log('---------------------------------')
    next(err)
}

async function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.send({
            error: 'Something failed!',
        })
    } else {
        next(err)
    }
}

async function errorHandler(err, _req, res, _next) {
    if (err.message === 'Invalid request') {
        return res.status(400).send({
            status: false,
            message: err.message,
            error: err.stack,
        })
    } else if (err.message === 'Not Found') {
        return res.status(404).send({
            status: false,
            message: err.message,
        })
    } else if (err.message === 'Invalid token') {
        return res.status(403).send({
            status: false,
            message: err.message,
            error: err.stack,
        })
    } else if (err.message === 'Blacklisted token') {
        return res.status(403).send({
            status: false,
            message: err.message,
            error: err.stack,
        })
    } else if (err.message === 'Invalid token :- Token is not in store') {
        return res.status(403).send({
            status: false,
            message: err.message,
            error: err.stack,
        })
    } else if (err.message === 'User not found') {
        return res.status(404).send({
            status: false,
            message: err.message,
            error: err.stack,
        })
    } else if (err.message === 'Username or Email already exists') {
        return res.status(400).send({
            status: false,
            message: err.message,
            error: err.stack,
        })
    } else if (err.message === 'Username or Password is not valid') {
        return res.status(401).send({
            status: false,
            message: err.message,
            error: err.stack,
        })
    } else {
        return res.status(500).send({
            status: false,
            message: err.message,
            error: err.stack,
        })
    }
}

module.exports = {
    notFound,
    logErrors,
    clientErrorHandler,
    errorHandler,
}
