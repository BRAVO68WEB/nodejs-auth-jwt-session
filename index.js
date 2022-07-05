require('dotenv').config()
const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const connectMongo = require('./helpers/mongo_connect')
const checkENV = require('./utils/checkENV.utils')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cors())
;(async () => {
    try {
        await connectMongo()
        await checkENV()
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
})()

const err_routes = require('./utils/errorHandler.utils')

console.log('Auto Loading routes 🎩 ...')
fs.readdirSync('./routes/').forEach(function (file) {
    console.log('Loading route: /' + file.split('.')[0])
    app.use(`/${file.split('.')[0]}`, require('./routes/' + file))
})

app.use('*', err_routes.notFound)
app.use(err_routes.logErrors)
app.use(err_routes.clientErrorHandler)
app.use(err_routes.errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`🤖 API Server is running at ${port} ...`))
