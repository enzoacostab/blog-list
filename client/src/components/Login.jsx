import propTypes from 'prop-types'
import React, { useState } from 'react'
import sessionsService from '../services/sessions'
import usersService from '../services/users'

const Login = ({ msg, setMsg, setAuth, setUser }) => {
  const { login } = sessionsService
  const { register } = usersService
  const [form, setForm] = useState('login')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const message = document.getElementById('msg')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setAuth({ headers: { Authorization: `Bearer ${user.token}` } })
      setUsername('')
      setPassword('')
    } catch (err) {
      setMsg('wrong username or password')
      message.classList.add('err')
      setTimeout(() => {
        message.classList.remove('err')
        setMsg('')
      }, 5000)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await register({ username, password, name })
      setForm('login')
      setUsername('')
      setPassword('')
      setName('')
      setMsg('Registered Successfully')
      message.classList.add('done')
      setTimeout(() => {
        message.classList.remove('done')
        setMsg('')
      }, 5000)
    } catch (err) {
      setMsg('wrong username or password')
      message.classList.add('err')
      setTimeout(() => {
        message.classList.remove('err')
        setMsg('')
      }, 5000)
    }
  }

  const handleFormChange = (form) => {
    setForm(form)
    setUsername('')
    setPassword('')
    setName('')
  }

  if (form === 'login') {
    return (
      <div>
        <h2>Log in to application</h2>
        <h3 id='msg'>{msg}</h3>
        <form onSubmit={handleLogin}>
          <input id='username' type='text' placeholder='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
          <input id='password' type='password' placeholder='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          <input id='login' value='login' type='submit'/>
          <button onClick={() => handleFormChange('register')}>register</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Register</h2>
          <h3 id='msg'>{msg}</h3>
          <form onSubmit={handleRegister}>
            <input id='username' type='text' placeholder='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
            <input id='name' type='text' placeholder='name' value={name} onChange={({ target }) => setName(target.value)}/>
            <input id='password' type='password' placeholder='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
            <input id='register' value='register' type='submit'/>
            <button onClick={() => handleFormChange('login')}>login</button>
          </form>
      </div>
    )
  }
}

Login.propTypes = {
  msg: propTypes.string.isRequired,
  setMsg: propTypes.func.isRequired,
  setAuth: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired
}

export default Login
