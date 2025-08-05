import { useState } from 'react'
import { Button } from './components/Button'
import {Routes,Route,Link,useNavigate} from "react-router-dom"

import Login from './pages/Login'
import Workmain from './pages/Workmain'
import Adminmain from './pages/Adminmain'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'
import Statistics from "./pages/Statistics"
import Retouch from "./pages/Retouch"

import Layout from "./components/Layout"
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

        <Route element={<Layout />}>
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


          <Route path="/edit/:date" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Edit/>
            </PrivateRoute>
            }/>

          <Route path="/statistics" element={<Statistics />}/>
          <Route path="/retouch/:date" element={<Retouch />}/>
        </Route>   


        <Route path="/redirect" element={<RedirectRoute />} />
        <Route path="/*" element={<Notfound/>}/>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
