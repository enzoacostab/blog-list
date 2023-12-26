import { Router } from 'express'
import { addBlog, markAsRead } from '../controllers/reading-lists-controller.js'

const router = Router()
router.post('/api/readinglists', addBlog)
router.put('/api/readinglists/:id', markAsRead)

export default router
