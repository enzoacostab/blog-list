import axios from 'axios'
const registerUrl = '/api/users'

const register = async (credentials) => {
  try {
    const response = await axios.post(registerUrl, credentials)
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export default { register }
