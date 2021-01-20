const sequelize = require('../config/db')
const Sequelize = require('sequelize')

const userModel = require('./user')
const activityModel = require('./activity')
const feedbackModel = require('./feedback')

const models = {
    User: userModel(sequelize, Sequelize),
    Activity: activityModel(sequelize, Sequelize),
    Feedback: feedbackModel(sequelize, Sequelize)
}

models.User.hasMany(models.Activity)
models.Activity.hasMany(models.Feedback, { onDelete: 'cascade' })



module.exports = { ...models, sequelize }