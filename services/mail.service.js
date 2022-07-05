const nodemailer = require('nodemailer')

let mailClient = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
    },
})

async function sendMail(body, next) {
    const { to, subject, text } = body
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: to,
        subject: subject,
        text: text,
    }
    try {
        await mailClient.sendMail(mailOptions)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    sendMail,
}
