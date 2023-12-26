import { sequelize } from '../util/db.cjs'
import { DataTypes } from 'sequelize'

const ActiveSession = sequelize.define('active_sessions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  }
}, { timestamps: false })

export default ActiveSession
