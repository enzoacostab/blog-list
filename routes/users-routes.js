import { Router } from 'express'
import { getUsers, createUser, updateUser, getUser } from '../controllers/users-controller.js'
import { userExtractor } from '../util/middleware.js'

const router = Router()
router.post('/api/users', createUser)
router.get('/api/users', userExtractor, getUsers)
router.get('/api/users/:id', userExtractor, getUser)
router.put('/api/users/:username', userExtractor, updateUser)

export default router
