import propTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import sessionsService from '../services/sessions'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from './ui/use-toast'
import { AlertCircle } from 'lucide-react'
import { Button } from './ui/button'

const Login = ({ setAuth, setUser, user }) => {
  const { login } = sessionsService
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    } catch (err) {
      console.error(err.message);
      toast({
        description: 
          <div className='flex gap-6 items-center'>
            <AlertCircle/>
            <p>{err.response?.data?.error || 'An error occurred while logging in.'}</p>
          </div>
      })
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
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
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

Login.propTypes = {
  setAuth: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired,
  user: propTypes.object
}

export default Login
