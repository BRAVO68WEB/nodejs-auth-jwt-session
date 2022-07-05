const route = require('express').Router()
const auth_middleware = require('../middlewares/auth.middleware')
const user_controller = require('../controllers/user.controller')

route.get('/dashboard', auth_middleware.verifyToken, user_controller.Dashboard)
route.get('/all', auth_middleware.verifyToken, user_controller.GetAllUsers)
route.get(
    '/:username',
    auth_middleware.verifyToken,
    user_controller.GetUserByUsername
)
route.get(
    '/id/:user_id',
    auth_middleware.verifyRefreshToken,
    user_controller.GetUserById
)
route.patch('/', auth_middleware.verifyToken, user_controller.UpdateUser)
route.delete('/', auth_middleware.verifyToken, user_controller.DeleteUser)

module.exports = route
