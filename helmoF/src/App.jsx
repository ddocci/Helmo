import { useState } from 'react'
import { Button } from './components/Button'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      안녕하세요
      <Button/>
    </>
  )
}

export default App
