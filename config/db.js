const Sequelize = require('sequelize')

const sequelize = new Sequelize('webtech_project', 'root', '', {
    dialect: 'mysql'
})


module.exports = sequelize