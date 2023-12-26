import { col, fn, Op } from 'sequelize'
import Blog from '../models/Blog.js'

export const getAuthors = async (req, res, next) => {
  const likes = [fn('SUM', col('likes')), 'likes']
  const articles = [fn('COUNT', col('id')), 'articles']

  try {
    const authors = await Blog.findAll({
      attributes: ['author', articles, likes],
      group: 'author',
      where: {
        author: {
          [Op.not]: null
        }
      }
    })

    res.json(authors)
  } catch (error) {
    next(error)
  }
}
