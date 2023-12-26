import axios from 'axios'
const loginUrl = '/api/login'
const logoutUrl = '/api/logout'

const login = async (credentials) => {
  try {
    const response = await axios.post(loginUrl, credentials)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const logout = async (auth) => {
  try {
    await axios.delete(logoutUrl, auth)
  } catch (error) {
    console.error(error)
  }
}

export default { login, logout }
