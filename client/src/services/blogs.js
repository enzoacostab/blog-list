import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async (data, auth) => {
  const response = await axios.post(baseUrl, data, auth)
  return response.data
}
const like = async (data, auth) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, data, auth)
  return response.data
}
const remove = async (id, auth) => {
  await axios.delete(`${baseUrl}/${id}`, auth)
}

export default { getAll, create, like, remove }
