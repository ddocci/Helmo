import { useState } from 'react'
import { Button } from './components/Button'
import {Routes,Route,Link,useNavigate, BrowserRouter, Router} from "react-router-dom"
import Login from './pages/Login'

import Workmain from './pages/Workmain'
import Adminmain from './pages/Adminmain'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'
import Statistics from './pages/Statistics'
import Retouch from './pages/Retouch'

// import './App.css'


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/workmain/:id" element={<Workmain/>}/>
      <Route path="/adminmain/:id" element={<Adminmain/>}/>
      <Route path="/edit/:date" element={<Edit/>}/>
      <Route path="/*" element={<Notfound/>}/>
      <Route path="/statistics" element={<Statistics/>}/>
      <Route path="/retouch/:date" element={<Retouch/>}/>
    </Routes>
    </>
  )
}

export default App
