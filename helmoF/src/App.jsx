import { useState } from 'react'
import { Button } from './components/Button'
import {Routes,Route,Link,useNavigate} from "react-router-dom"
import Login from './pages/Login'
import Adminmain from './pages/Adminmain'
import Workmain from './pages/Workmain'
import Notfound from './pages/Notfound'
import Edit from './pages/Edit'

// import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/adminmain" element={<Adminmain/>}/>
      <Route path="/workmain/:id" element={<Workmain/>}/>
      <Route path="/edit" element={<Edit/>}/>
      <Route path='*' element={<Notfound/>}/>
    </Routes>
    </>
  )
}

export default App
