import React, { useContext } from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { ModeToggle } from './ModeToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { context } from '@/context/context'
import sessionService from '@/services/sessions'
import { User, LogOut, Bookmark, Home, Plus, LogIn, AlertCircle } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from './ui/use-toast'

export default function Header() {
  const { user, auth, setUser, setAuth } = useContext(context)
  const { logout } = sessionService
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout(auth)
      window.localStorage.clear()
      setUser(null)
      setAuth(null)
      navigate('/')
    } catch (err) {
      console.error(err.message);
      toast({
        description: 
          <div className='flex gap-6 items-center'>
            <AlertCircle/>
            <p>{err.response?.data?.error || 'An error occurred while signing out.'}</p>
          </div>
      })
    }
  }

  return (
    <div className='h-full min-h-[100dvh] p-5'>
      <header className='pb-5 flex justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger className='focus-visible:outline-none hover:opacity-85'>
            <Avatar>
              <AvatarFallback><User/></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`mr-10 ${user ? "mt-14" : "mt-3"} scale-150 sm:scale-100 sm:m-0`}>
            {user
              ? <>
                  <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem onClick={() => navigate('/')}><Home size={16} className='mr-2'/>Home</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/reading-list')}><Bookmark size={16} className='mr-2'/>Reading list</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/add-blog')}><Plus size={16} className='mr-2'/>Add blog</DropdownMenuItem>
                  <ModeToggle/>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem onClick={handleLogout}><LogOut size={16} className='mr-2'/>Log out</DropdownMenuItem>
                </>
              : <DropdownMenuItem onClick={() => navigate('/login')}><LogIn size={16} className='mr-2'/>Sign in</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Outlet/>
    </div>
  )
}
