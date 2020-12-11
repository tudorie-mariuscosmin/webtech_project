const sequelize = require('../config/db')
const Sequelize = require('sequelize')

const userModel = require('./user')
const activityModel = require('./activity')

const models = {
    User: userModel(sequelize, Sequelize),
    Activity: activityModel(sequelize, Sequelize)
}

models.User.hasMany(models.Activity)



module.exports = { ...models, sequelize }