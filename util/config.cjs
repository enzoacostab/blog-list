require('dotenv').config()

module.exports = {
  POSTGRES_URL: process.env.POSTGRES_URL,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASS: process.env.POSTGRES_PASS,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET
}
