import React from 'react'
import "./styles/global.css"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './pages/Home'
const App = () => {
  

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* auth route */}
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/auth/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
