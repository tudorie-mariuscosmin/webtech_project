
const models = require('../models')

const controller = {
    resetDatabase: async (req, res) => {
        try {
            await models.sequelize.sync({ force: true })

            await models.User.create({
                firstName: 'admin',
                lastName: 'admin',
                email: 'admin@app.com',
                password: 'admin',
                isAdmin: 1
            })
            res.status(200).json({ message: "created" })

        } catch (err) {
            if (err) {
                res.status(500).json({ message: 'Error encountered when creating tables' });
                console.warn(err)
            }
        }
    }
}

module.exports = controller