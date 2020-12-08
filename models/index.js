const sequelize = require('../config/db')
const Sequelize = require('sequelize')

const userModel = require('./user')

const models = {
    User: userModel(sequelize, Sequelize.DataTypes)
}



module.exports = { ...models, sequelize }