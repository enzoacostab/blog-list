import React, { useContext, useEffect, useState } from 'react'
import sessionsService from '../services/sessions'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from './ui/use-toast'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { context } from '@/context/context'

export default function Login() {
  const { setAuth, user, setUserId } = useContext(context)
  const { login } = sessionsService
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    e.target.login.disabled = true

    try {
      const loggedUser = await login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      )
      setUserId(loggedUser.id)
      setAuth({ headers: { Authorization: `Bearer ${loggedUser.token}` } })
    } catch (err) {
      console.error(err.message);
      toast({
        description: 
          <div className='flex gap-6 items-center'>
            <AlertCircle/>
            <p>{err.response?.data?.error || 'An error occurred while logging in.'}</p>
          </div>
      }) 
    } finally {
      e.target.login.disabled = false
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
            <Label htmlFor="email" className="text-gray-500 dark:text-gray-400">
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
              <Label htmlFor="password" className="text-gray-500 dark:text-gray-400">
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
            <Button type="submit" name="login" className="w-full *:disabled:size-4">
              <Loader2 className='animate-spin bg-transparent size-0 mr-2 transition-all'/>
              Log in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link to="/register" className="font-semibold ml-1 leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
