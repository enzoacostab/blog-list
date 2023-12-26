require('dotenv').config()

module.exports = {
  POSTGRES_URL: process.env.POSTGRES_URL,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET
}
