import axios from 'axios'
const registerUrl = '/api/users'

const register = async (credentials) => {
  await axios.post(registerUrl, credentials)
}

export default { register }
