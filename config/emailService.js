const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nya.cartwright6@ethereal.email',
        pass: 'bBe7pdJ35FTmbzU5nw'
    }
});

module.exports = transporter