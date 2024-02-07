import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ActiveSession from '../models/ActiveSessions.js'
import pkg from '../util/config.cjs'
const { SECRET } = pkg

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({
      where: {
        username
      }
    })

    const alreadyLogged = await ActiveSession.findOne({
      include: {
        model: User,
        where: {
          username
        }
      }
    })

    const passwordCorrect = user
      ? await bcrypt.compare(password, user?.passwordHash)
      : false

    if (!user || !passwordCorrect) {
      return res.status(401).json({
        error: 'The username or password is incorrect'
      })
    }

    if (user.disabled) {
      throw new Error('account disabled, please contact admin')
    }

    if (alreadyLogged) {
      res.json(alreadyLogged)
    }

    const userForToken = {
      username,
      id: user.id
    }
    const token = jwt.sign(userForToken, SECRET)

    await ActiveSession.create({
      token,
      userId: user.id
    })

    res.json({ token, username, id: user.id })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    const { id } = req.user
    await ActiveSession.destroy({
      where: {
        userId: id
      }
    })

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
