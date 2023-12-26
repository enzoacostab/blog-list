const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
    await queryInterface.addColumn('blogs', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
    await queryInterface.addColumn('users', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
    await queryInterface.addColumn('users', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'createdAt')
    await queryInterface.removeColumn('users', 'updatedAt')
    await queryInterface.removeColumn('blogs', 'createdAt')
    await queryInterface.removeColumn('blogs', 'updatedAt')
  }
}
