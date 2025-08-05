import { useState } from 'react'
import { Button } from './components/Button'
import {Routes,Route,Link,useNavigate} from "react-router-dom"
import Login from './pages/Login'

import Workmain from './pages/Workmain'
import Adminmain from './pages/Adminmain'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'

import PrivateRoute from './routes/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import RedirectRoute from './routes/RedirectRoute'
// import './App.css'


function App() {

  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>       
        <Route path="/workmain/:userId" element={
          <PrivateRoute allowedRoles={["worker"]}>
            <Workmain/>
          </PrivateRoute>
          }/>
          
        <Route path="/adminmain/:userId" element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Adminmain/>
          </PrivateRoute>
          }/>


        <Route path="/edit" element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Edit/>
          </PrivateRoute>
          }/>

        <Route path="/redirect" element={<RedirectRoute />} />
        <Route path="/*" element={<Notfound/>}/>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
