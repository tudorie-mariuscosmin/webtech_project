const { User } = require('../models')
const { Op } = require('sequelize')

module.exports = {
    createUser: async (req, res) => {
        if (!req.body.firstName || !req.body.lastName || !req.body.email)
            res.sendStatus(400)
        else if (!req.body.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)) {
            res.status(400).json({ message: 'Invalid email' })
        } else {
            try {
                const user = await User.findOne({ where: { email: req.body.email } })
                if (user) {
                    res.status(400).json({ message: 'User already registred' })
                } else {
                    const password = Math.random().toString(36).slice(-8)
                    const user = await User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password
                    })

                    res.status(201).json({ message: 'Created' })
                }
            } catch (err) {
                console.warn(err)
                res.status(500).json({ message: err.message })
            }
        }
    },
    getAllUsers: async (req, res) => {
        const querry = {
            where: {}
        }
        if (req.query.filter) {
            querry.where.name = {
                [Op.like]: `%${req.query.filter}`
            }
        }
        let pageSize = 10
        if (req.query.pageSize) {
            pageSize = parseInt(req.query.pageSize)
        }
        if (req.query.page) {
            const page = parseInt(req.query.page)
            querry.limit = pageSize
            querry.offset = page * pageSize
        }
        try {
            let users = await User.findAll(querry)
            if (users) {
                const data = users.map(user => {
                    return {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }
                });

                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Users not found' })
            }

        } catch (err) {
            console.warn(err);
            res.status(500).json({ message: err.message })
        }
    }
}