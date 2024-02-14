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
import { User, LogOut, Bookmark, Home, Plus, LogIn } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Header() {
  const { user, auth } = useContext(context)
  const { logout } = sessionService
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout(auth)
    window.localStorage.clear()
    window.location.reload()
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
          <DropdownMenuContent>
            {user
              ? <>
                  <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem onClick={() => navigate('/')}><Home size={15} className='mr-2'/>Home</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/reading-list')}><Bookmark size={15} className='mr-2'/>Reading list</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/add-blog')}><Plus size={15} className='mr-2'/>Add blog</DropdownMenuItem>
                  <ModeToggle/>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem onClick={handleLogout}><LogOut size={15} className='mr-2'/>Log out</DropdownMenuItem>
                </>
              : <DropdownMenuItem onClick={() => navigate('/login')}><LogIn size={15} className='mr-2'/>Sign in</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Outlet/>
    </div>
  )
}
