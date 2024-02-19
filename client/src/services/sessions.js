import axios from 'axios'
const loginUrl = '/api/login'
const logoutUrl = '/api/logout'

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const logout = async (auth) => {
  const response = await axios.delete(logoutUrl, auth)
  return response.data
}

export default { login, logout }
