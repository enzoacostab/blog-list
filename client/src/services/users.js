import axios from 'axios'
const baseUrl = '/api/users'

const register = async (credentials) => {
  await axios.post(baseUrl, credentials)
}

const getUser = async (auth, id) => {
  const response = await axios.get(`${baseUrl}/${id}`, auth)
  return response.data
}

export default { register, getUser }
