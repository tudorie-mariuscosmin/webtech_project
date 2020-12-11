module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return sequelize.define('activity', {
        name: { type: DataTypes.STRING, allowNull: false },
        subject: { type: Sequelize.ENUM, allowNull: false, values: ['MATH', 'POO', 'DATABASES'] },
        description: { type: Sequelize.STRING },
        token: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4 }
    })
}