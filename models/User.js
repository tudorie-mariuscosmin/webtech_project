module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return sequelize.define(
        'user',
        {
            firstName: { type: DataTypes.STRING, allowNull: false, validate: { len: [3, 20] } },
            lastName: { type: DataTypes.STRING, allowNull: false, validate: { len: [3, 20] } },
            email: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },
            isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }

        }
    )
}