import express from 'express'
import blogsRouter from './routes/blogs-routes.js'
import usersRouter from './routes/users-routes.js'
import sessionsRouter from './routes/sessions-routes.js'
import readingListsRouter from './routes/reading-lists-routes.js'
import { errorHandler, userExtractor } from './util/middleware.js'
import { getAuthors } from './controllers/authors-controller.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.static('client/dist'))
app.use(sessionsRouter)
app.use(usersRouter)
app.get('/api/authors', getAuthors)
app.use(userExtractor)
app.use(readingListsRouter)
app.use(blogsRouter)
app.use(errorHandler)

export default app
