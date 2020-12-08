const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config.json')
module.exports = {
    login: async (req, res) => {
        if (!req.body.email || !req.body.password)
            res.status(400).json({ message: "Enter credentials!" })
        else if (!req.body.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim))
            res.status(400).json({ message: 'Invalid email' })
        else {
            try {
                const user = await User.findOne({ where: { email: req.body.email } })
                if (!user) {
                    res.status(404).json({ message: 'User not found' })
                } else {
                    if (user.password === req.body.password) {
                        const token = jwt.sign(user.id, jwtSecret)
                        res.status(200).json({ token })
                    }
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error' })
            }

        }
    },

    authMiddleware: {
        authenticate: async (req, res, next) => {
            const AuthorizationHeader = req.headers['authorization']
            const token = AuthorizationHeader && AuthorizationHeader.split(' ')[1]
            if (!token) res.sendStatus(401);
            else {
                try {
                    let data = await jwt.verify(token, jwtSecret)
                    if (data) {
                        const user = await User.findByPk(data)
                        if (user) {
                            req.user = user
                            next()
                        }
                    }

                } catch (err) {

                    if (err) {
                        console.warn(err)
                        res.sendStatus(500)
                    }
                }

            }
        }

    }
}

