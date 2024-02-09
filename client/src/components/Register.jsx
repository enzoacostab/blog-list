import propTypes from 'prop-types'
import React, { useState } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import { Input } from './ui/input'
import { Label } from './ui/label'

const Register = ({ message, setMessage, user }) => {
  const { register } = usersService
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const messageElement = document.getElementById('message')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await register({ username, password, name })
      setUsername('')
      setPassword('')
      setName('')
      messageElement.classList.add('done')
      setMessage('Registered Successfully')
      setTimeout(() => {
        messageElement.classList.remove('done')
        setMessage('')
      }, 5000)
    } catch (err) {
      console.log(err);
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
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegister} className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="email">
              Email address
            </Label>
            <div className="mt-2">
              <Input
                onChange={({ target }) => setUsername(target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">
              Name
            </Label>
            <div className="mt-2">
              <Input
                onChange={({ target }) => setName(target.value)}
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">
                Password
              </Label>
            </div>
            <div className="mt-2">
              <Input
                onChange={({ target }) => setPassword(target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Are you already a member?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

Register.propTypes = {
  message: propTypes.string.isRequired,
  user: propTypes.object,
  setMessage: propTypes.func.isRequired,
}

export default Register
