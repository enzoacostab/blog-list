import ReadingList from '../models/ReadingList.js'

export const addBlog = async (req, res, next) => {
  try {
    const blogId = req.body.id
    const userId = req.user.id
    const isInReadingList = await ReadingList.findOne({
      where: {
        userId,
        blogId
      }
    })

    if (isInReadingList) {
      throw new Error('The blog already exists in the reading list')
    }

    const blog = {
      read: false,
      userId,
      blogId
    }

    await ReadingList.create(blog)
    res.json(blog)
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
