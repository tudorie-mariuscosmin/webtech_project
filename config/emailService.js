const nodemailer = require('nodemailer')
const { smtpCredentials } = require('../config.json')

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: smtpCredentials.user,
        pass: smtpCredentials.pass
    }
});

module.exports = transporter