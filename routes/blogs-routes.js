import { Router } from 'express'
import { getBlogs, createBlog, deleteBlog, updateBlog } from '../controllers/blogs-controller.js'

const router = Router()
router.get('/api/blogs', getBlogs)
router.post('/api/blogs', createBlog)
router.put('/api/blogs/:id', updateBlog)
router.delete('/api/blogs/:id', deleteBlog)

export default router
