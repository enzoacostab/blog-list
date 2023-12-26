import { Router } from 'express'
import { login, logout } from '../controllers/sessions-controller.js'
import { userExtractor } from '../util/middleware.js'

const router = Router()
router.post('/api/login', login)
router.delete('/api/logout', userExtractor, logout)

export default router
