const Sequelize = require('sequelize')
const { dbConfig } = require('../config.json')

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: dbConfig.dialect
})


module.exports = sequelize