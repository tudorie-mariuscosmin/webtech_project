module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return sequelize.define('activity', {
        name: { type: DataTypes.STRING, allowNull: false },
        subject: { type: DataTypes.ENUM, allowNull: false, values: ['MATH', 'POO', 'DATABASES', 'HYSTORY', 'PHYSICS', 'GEOGRAPHY', 'ECONOMY', 'MANAGEMENT', 'ENGLISH'] },
        description: { type: DataTypes.STRING },
        token: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4 },
        isOpen: { type: DataTypes.BOOLEAN, defaultValue: true },
        endAt: { type: DataTypes.DATE, allowNull: false }
    })
}