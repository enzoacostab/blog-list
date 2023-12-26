import { connectToDatabase } from './util/db.cjs'
import app from './app.js'
import pkg from './util/config.cjs'
const { PORT } = pkg

const main = async () => {
  try {
    await connectToDatabase()
    app.listen(PORT || 3000)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
