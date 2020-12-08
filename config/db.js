const Sequelize = require('sequelize')

const sequelize = new Sequelize('webtech_project', 'root', '', {
    dialect: 'mysql'
})

try {
    async () => {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
} catch (err) {
    console.warn('Unable to connect to the database:', err)
}

module.exports = sequelize