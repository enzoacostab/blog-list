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

    const blogWithUser = await Blog.findByPk(newBlog.id, {
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
      }]
    })

    res.json(blogWithUser)
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

    const users = await User.findAll({
      attributes: ['likes', 'id']
    })

    for (const user of users) {
      const { likes } = user

      if (likes && likes.includes(id)) {
        const updatedLikes = likes.filter(blogId => blogId !== parseInt(id))
        await User.update({ likes: updatedLikes }, {
          where: {
            id: user.id
          }
        })
      }
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
  const userId = req.user.id

  try {
    const user = await User.findByPk(userId)
    const blog = await Blog.findByPk(id, {
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
      }]
    })

    if (user.likes) {
      if (user.likes.includes(parseInt(id))) {
        blog.likes = likes - 1
        user.likes = user.likes.filter(blogId => blogId !== parseInt(id))
      } else {
        blog.likes = likes + 1
        user.likes = [...user.likes, parseInt(id)]
      }
    } else {
      blog.likes = likes + 1
      user.likes = [parseInt(id)]
    }

    await blog.save()
    await user.save()
    res.json(blog)
  } catch (error) {
    next(error)
  }
}
