import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (auth) => {
  try {
    const request = await axios.get(baseUrl, auth)
    return request.data
  } catch (error) {
    console.error(error)
  }
}
const create = async (data, auth) => {
  try {
    const request = await axios.post(baseUrl, data, auth)
    return request.data
  } catch (error) {
    console.error(error)
  }
}
const like = async (data, auth) => {
  try {
    const request = await axios.put(`${baseUrl}/${data.id}`, data, auth)
    return request.data
  } catch (error) {
    console.error(error)
  }
}
const remove = async (id, auth) => {
  try {
    return await axios.delete(`${baseUrl}/${id}`, auth)
  } catch (error) {
    console.error(error)
  }
}

export default { getAll, create, like, remove }
