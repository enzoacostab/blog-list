import axios from 'axios'
const loginUrl = '/api/login'
const logoutUrl = '/api/logout'

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const logout = async (auth) => {
  await axios.delete(logoutUrl, auth)
}

export default { login, logout }
