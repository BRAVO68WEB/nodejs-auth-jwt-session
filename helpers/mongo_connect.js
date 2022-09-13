const mongoose = require('mongoose')

module.exports = async () => {
    await mongoose.connect(
        process.env.DB_CONN_STRING,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        },
        () => console.log('Connected to MongoDB 🍀')
    )
    return
}
