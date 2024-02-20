import React, { useContext, Suspense, lazy } from 'react'
import Loader from './components/Loader'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import { context } from './context/context'
import './services/index'
import './App.css'
import './index.css'
const Register = lazy(() => import('./components/Register'))
const Login = lazy(() => import('./components/Login'))
const Header = lazy(() => import('./components/Header'))
const ReadingList = lazy(() => import('./components/ReadingList'))
const CreateBlog = lazy(() => import('./components/CreateBlog'))
const Blogs = lazy(() => import('./components/Blogs'))

export default function App() {
  const { blogs } = useContext(context)
  
  if (!blogs) {
    return <Loader/>
  } else {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Header/>}>
              <Route path='/reading-list' element={<ReadingList/>} />
              <Route path='/' element={<Blogs/>}/>
              <Route path='/add-blog' element={<CreateBlog/>}/>
            </Route>
          </Routes>
        </Suspense>
        <Toaster/>
      </ThemeProvider>
    )
  }
}
