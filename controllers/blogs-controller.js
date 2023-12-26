import Blog from '../models/Blog.js'
import User from '../models/User.js'
import { Op } from 'sequelize'

export const getBlogs = async (req, res, next) => {
  try {
    let where = {}

    if (req.query.search) {
      where = {
        [Op.or]: [{
          title: {
            [Op.substring]: req.query.search
          }
        }, {
          author: {
            [Op.substring]: req.query.search
          }
        }]
      }
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: [{
        model: User,
        attributes: ['username']
      }, {
        model: User,
        as: 'readings',
        attributes: ['id', 'username'],
        through: {
          attributes: []
        }
      }],
      where,
      order: [
        ['likes', 'DESC']
      ]
    })

    res.json(blogs)
  } catch (error) {
    next(error)
  }
}

export const createBlog = async (req, res, next) => {
  const { title, author, url, year } = req.body

  try {
    const user = req.user
    const newBlog = await Blog.create({
      userId: user.id,
      title,
      author,
      url,
      year
    })

    res.json(newBlog)
  } catch (error) {
    next(error)
  }
}

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params

  try {
    const { userId } = await Blog.findByPk(id)

    if (req.user.id !== userId) {
      return res.status(401).json({ error: 'authorization error' })
    }

    await Blog.destroy({
      where: {
        id
      }
    })

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const updateBlog = async (req, res, next) => {
  const { id } = req.params
  const { likes } = req.body

  try {
    const blog = await Blog.findByPk(id)

    if (req.user.id !== blog.userId) {
      return res.status(401).json({ error: 'authorization error' })
    }

    blog.likes = likes
    blog.save()

    res.json(blog)
  } catch (error) {
    next(error)
  }
}
