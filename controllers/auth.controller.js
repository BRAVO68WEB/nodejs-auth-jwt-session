const User = require('../models/user.model')
const redis_client = require('../helpers/redis_connect')
const {
    GenerateAccessToken,
    GenerateRefreshToken,
} = require('../services/auth.service')

async function Register(req, res, next) {
    // encrypt password
    const checkIfUsernameExists = await User.findOne({
        username: req.body.username,
    }).exec()
    const checkIfEmailExists = await User.findOne({
        email: req.body.email,
    }).exec()

    if (checkIfUsernameExists !== null || checkIfEmailExists !== null)
        throw new Error('Username or Email already exists')

    const user = new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        address: {
            street: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
        },
        birthday: req.body.birthday,
    })

    user.setPassword(req.body.password)

    try {
        const saved_user = await user.save()
        res.json({
            status: true,
            message: 'Registered successfully.',
            data: saved_user,
        })
    } catch (error) {
        // do logging in DB or file.
        next(error)
    }
}

async function Login(req, res, next) {
    const username = req.body.username

    try {
        const user = await User.findOne({
            username: username,
        }).exec()

        if (user === null || !user.validatePassword(req.body.password))
            throw new Error('Username or Password is not valid')
        const access_token = GenerateAccessToken(user._id)
        const refresh_token = GenerateRefreshToken(user._id)

        return res.json({
            status: true,
            message: 'Login Successfully.',
            data: {
                access_token,
                refresh_token,
            },
        })
    } catch (error) {
        next(error)
    }
}

async function Logout(req, res, next) {
    try {
        const user_id = req.userData.user
        const token = req.token

        await redis_client.del(user_id.toString())

        await redis_client.set('BL_' + user_id.toString(), token)

        return res.json({
            status: true,
            message: 'Successfully Logged out',
        })
    } catch (error) {
        next(error)
    }
}

async function checkUsernameAvaiblity(req, res, next) {
    const username = req.params.username

    try {
        const user = await User.findOne({
            username: username,
        }).exec()

        if (user === null)
            return res.status(200).json({
                status: true,
                message: 'Username is available',
            })
        return res.status(200).json({
            status: false,
            message: 'Username is not available',
        })
    } catch (error) {
        next(error)
    }
}

async function GetOnlyNewAccessToken(req, res, next) {
    try {
        const userData = req.userData.user
        const access_token = GenerateAccessToken(userData)

        return res.json({
            status: true,
            message: 'Successfully generated new access token.',
            data: {
                access_token,
            },
        })
    } catch (error) {
        next(error)
    }
}

async function GetNewToken(req, res, next) {
    try {
        const userData = req.userData.user

        const access_token = GenerateAccessToken(userData)
        const refresh_token = GenerateRefreshToken(userData)

        return res.json({
            status: true,
            message:
                'Successfully generated new access token and refresh token.',
            data: {
                access_token,
                refresh_token,
            },
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    Register,
    Login,
    Logout,
    checkUsernameAvaiblity,
    GetOnlyNewAccessToken,
    GetNewToken,
}
