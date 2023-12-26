const { Sequelize } = require('sequelize')
const { POSTGRES_URL } = require('./config.cjs')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(POSTGRES_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }
}

const migrationConf = {
  migrations: {
    glob: 'migrations/*.cjs'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name)
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = {
  connectToDatabase,
  sequelize,
  rollbackMigration
}
