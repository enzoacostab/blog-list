import axios from 'axios'
const baseUrl = '/api/readinglists'

const addBlog = async (data, auth) => {
  const response = await axios.post(baseUrl, data, auth)
  return response.data
}


export default { addBlog }