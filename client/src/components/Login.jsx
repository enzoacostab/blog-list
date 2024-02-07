import propTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import sessionsService from '../services/sessions'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ message, setMessage, setAuth, setUser, user }) => {
  const { login } = sessionsService
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const messageElement = document.getElementById('message')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const us = await login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(us)
      )
      setUser(us)
      setAuth({ headers: { Authorization: `Bearer ${us.token}` } })
      setUsername('')
      setPassword('')
    } catch (err) {
      messageElement.classList.add('err')
      setMessage('wrong username or password')
      setTimeout(() => {
        messageElement.classList.remove('err')
        setMessage('')
      }, 5000)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={({ target }) => setUsername(target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={({ target }) => setPassword(target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

Login.propTypes = {
  message: propTypes.string.isRequired,
  user: propTypes.object,
  setMessage: propTypes.func.isRequired,
  setAuth: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired
}

export default Login
