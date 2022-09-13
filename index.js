require('dotenv').config()
const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const waitFor = require('wait-for-stuff')
// const wait = require('wait')

const app = express()
const connectMongo = require('./helpers/mongo_connect')
const checkENV = require('./utils/checkENV.utils')
const err_routes = require('./utils/errorHandler.utils')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cors())

// Connect to MongoDB and Config Checking
let startApp = async () => {
    try {
        console.log('Checking Config ...')
        await checkENV()
        console.log('Connecting to MongoDB ...')
        await connectMongo()

        console.log('Auto Loading routes 🎩 ...')
        fs.readdirSync('./routes/').forEach(function (file) {
            console.log('Loading route: /' + file.split('.')[0])
            app.use(`/${file.split('.')[0]}`, require('./routes/' + file))
        })
        console.log('Loaded all routes 🎩 ...')

        app.use('*', err_routes.notFound)
        app.use(err_routes.logErrors)
        app.use(err_routes.clientErrorHandler)
        app.use(err_routes.errorHandler)

        const port = process.env.PORT || 5000
        app.listen(port, () =>
            console.log(`🤖 API Server is running at ${port} ...`)
        )
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

waitFor.for.function(startApp)
