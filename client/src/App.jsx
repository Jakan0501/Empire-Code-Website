import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login.jsx'
import Register from './Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/register' element={<Register />}></Route>
        <Route path ='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
