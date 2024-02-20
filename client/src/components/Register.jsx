import React, { useContext, useEffect, useState } from 'react'
import usersService from '../services/users'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from './ui/use-toast'
import { AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { context } from '@/context/context'

const Register = () => {
  const { user } = useContext(context)
  const { register } = usersService
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await register({ username, password, name })
      toast({ description: <span>Registration successful!</span>, title: 'Success' })
      navigate('/login')
    } catch (err) {
      console.error(err);
      toast({
        description: 
          <div className='flex gap-6 items-center'>
            <AlertCircle/>
            <p>{err.response?.data?.error || 'An error occurred while registering.'}</p>
          </div>
      })
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
            <Label htmlFor="email" className="text-gray-500 dark:text-gray-400">
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
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Are you already a member?
          <Link to="/login" className="font-semibold leading-6 ml-1 text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
