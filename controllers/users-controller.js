import Blog from '../models/Blog.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Blog,
        attributes: {
          exclude: 'userId'
        }
      }, {
        model: Blog,
        as: 'readings',
        through: {
          attributes: []
        }
      }]
    })

    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read === 'true'
  }

  try {
    const { id } = req.params
    const user = await User.findByPk(id, {
      include: [{
        model: Blog,
        attributes: {
          exclude: 'userId'
        }
      }, {
        model: Blog,
        as: 'readings',
        attributes: {
          exclude: 'userId'
        },
        through: {
          attributes: ['read', 'id'],
          where
        }
      }]
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  const { name, username, password } = req.body

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      username,
      passwordHash
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  const { username } = req.params
  const newUsername = req.body.username

  try {
    const user = await User.findOne({
      where: {
        username
      }
    })

    user.username = newUsername
    await user.save()

    res.json(user)
  } catch (error) {
    next(error)
  }
}
