import { Router } from 'express'
import { addBlog, markAsRead } from '../controllers/reading-lists-controller.js'
import { userExtractor } from '../util/middleware.js'

const router = Router()
router.post('/api/readinglists', userExtractor, addBlog)
router.put('/api/readinglists/:id', markAsRead)

export default router
