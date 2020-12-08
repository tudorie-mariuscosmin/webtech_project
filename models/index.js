const sequelize = require('../config/db')

const models = {
    User: sequelize.import('./user')
}



module.exports = { ...models, sequelize }