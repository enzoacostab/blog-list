import User from '../models/User.js'
import ActiveSession from '../models/ActiveSessions.js'

export const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  res.status(500).json({ error: error.message })

  next(error)
}

export const userExtractor = async (req, res, next) => {
  const token = req.get('authorization')
  if (token && token.startsWith('Bearer ')) {
    try {
      const session = await ActiveSession.findOne({
        include: {
          model: User
        },
        where: {
          token: token.substring(7)
        }
      })

      req.user = session.user
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}
