import ReadingList from '../models/ReadingList.js'

export const addBlog = async (req, res, next) => {
  try {
    const { id } = req.body
    const userId = req.user.id
    const isInReadingList = await ReadingList.findOne({
      where: {
        userId,
        blogId: id
      }
    })

    if (isInReadingList) {
      await ReadingList.destroy({
        where: {
          userId,
          blogId: id
        }
      })
      return res.sendStatus(204)
    }

    const blog = {
      read: false,
      userId,
      blogId: id
    }

    const response = await ReadingList.create(blog)
    res.json({ read: false, id: response.id })
  } catch (error) {
    next(error)
  }
}

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    const blog = await ReadingList.findByPk(id)

    if (blog.userId !== userId) {
      return res.status(401).json({ error: 'authorization error' })
    }

    blog.read = true
    await blog.save()
    res.json(blog)
  } catch (error) {
    next(error)
  }
}
