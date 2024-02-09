import { Router } from 'express'
import { getBlogs, createBlog, deleteBlog, updateBlog } from '../controllers/blogs-controller.js'
import { userExtractor } from '../util/middleware.js'

const router = Router()
router.get('/api/blogs', getBlogs)
router.post('/api/blogs', userExtractor, createBlog)
router.put('/api/blogs/:id', userExtractor, updateBlog)
router.delete('/api/blogs/:id', userExtractor, deleteBlog)

export default router
