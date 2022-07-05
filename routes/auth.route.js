const route = require('express').Router()
const user_controller = require('../controllers/auth.controller')
const auth_middleware = require('../middlewares/auth.middleware')

route.post('/register', user_controller.Register)
route.post('/login', user_controller.Login)
route.get('/status/:username', user_controller.checkUsernameAvaiblity)
route.post(
    '/token',
    auth_middleware.verifyRefreshToken,
    user_controller.GetOnlyNewAccessToken
)
route.post(
    '/token/reset',
    auth_middleware.verifyRefreshToken,
    user_controller.GetNewToken
)
route.get('/logout', auth_middleware.verifyToken, user_controller.Logout)

module.exports = route
