module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return sequelize.define('feedback', {
        data: { type: DataTypes.STRING, allowNull: false }
    })
}