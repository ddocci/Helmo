import { useState } from 'react'
import { Button } from './components/Button'
import {Routes,Route,Link,useNavigate} from "react-router-dom"
import Login from './pages/Login'

import Workmain from './pages/Workmain'
import Adminmain from './pages/Adminmain'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'

// import './App.css'


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/workmain/:id" element={<Workmain/>}/>
      <Route path="/adminmain" element={<Adminmain/>}/>
      <Route path="/edit" element={<Edit/>}/>
      <Route path="/*" element={<Notfound/>}/>

    </Routes>
    </>
  )
}

export default App
