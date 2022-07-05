const User = require('../models/user.model')

async function GetUserById(req, res, next) {
    const user_id = req.params.user_id

    try {
        const user = await User.findById(user_id).exec()

        if (user === null) throw new Error('User not found')

        return res.json({
            status: true,
            message: 'User found.',
            data: user,
        })
    } catch (error) {
        next(error)
    }
}

async function GetUserByUsername(req, res, next) {
    const username = req.params.username

    try {
        const user = await User.findOne({
            username: username,
        }).exec()

        if (user === null) throw new Error('User not found')

        return res.json({
            status: true,
            message: 'User found.',
            data: user,
        })
    } catch (error) {
        next(error)
    }
}

async function GetAllUsers(_req, res, next) {
    try {
        const users = await User.find().exec()

        if (users === null) throw new Error('User not found')

        return res.json({
            status: true,
            message: 'Users found.',
            data: users,
        })
    } catch (error) {
        next(error)
    }
}

async function UpdateUser(req, res, next) {
    const user_id = req.userData.user
    const userData = req.body

    try {
        const user = await User.findById(user_id).exec()

        if (user === null) throw new Error('User not found')

        const updatedUser = await User.findByIdAndUpdate(user_id, userData, {
            new: true,
        }).exec()

        return res.json({
            status: true,
            message: 'User updated.',
            data: updatedUser,
        })
    } catch (error) {
        next(error)
    }
}

async function Dashboard(req, res, next) {
    const user_id = req.userData.user

    try {
        return res.json({
            status: true,
            message: 'Hello ' + user_id + ' from dashboard.',
        })
    } catch (error) {
        next(error)
    }
}

async function DeleteUser(req, res, next) {
    const user_id = req.userData.user

    try {
        const user = await User.findById(user_id).exec()

        if (user === null) throw new Error('User not found')

        await User.findByIdAndDelete(user_id).exec()

        return res.json({
            status: true,
            message: 'User deleted.',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    GetUserById,
    GetAllUsers,
    GetUserByUsername,
    UpdateUser,
    Dashboard,
    DeleteUser,
}
