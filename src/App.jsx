import React from 'react'
import "./styles/global.css"
import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
const App = () => {
  

  return (
    <>
      
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/chats' element={<ChatPage/>}/>
        {/* auth route */}
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/auth/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
