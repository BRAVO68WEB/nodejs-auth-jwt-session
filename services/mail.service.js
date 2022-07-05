const nodemailer = require('nodemailer')

let mailClient = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
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
        return res.json({
            status: true,
            message: 'Mail sent successfully.',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    sendMail,
}
