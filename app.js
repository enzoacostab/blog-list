import express from 'express'
import blogsRouter from './routes/blogs-routes.js'
import usersRouter from './routes/users-routes.js'
import sessionsRouter from './routes/sessions-routes.js'
import readingListsRouter from './routes/reading-lists-routes.js'
import { errorHandler } from './util/middleware.js'
import { getAuthors } from './controllers/authors-controller.js'
import cors from 'cors'
import pkg from './util/config.cjs'
const { CLIENT_URL } = pkg

const app = express()
app.use(express.json())
app.use(cors({ origin: CLIENT_URL }))
app.use(sessionsRouter)
app.use(usersRouter)
app.get('/api/authors', getAuthors)
app.use(blogsRouter)
app.use(readingListsRouter)
app.use(errorHandler)

export default app
