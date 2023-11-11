import React from 'react'
import "./styles/global.css"
import { Route, Routes } from 'react-router-dom'
import Register from './views/auth/Register'
import Login from './views/auth/Login'
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
