const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'likes', {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'likes')
  }
}
