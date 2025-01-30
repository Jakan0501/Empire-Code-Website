import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Courses from './pages/Courses/Courses.jsx'
import Profile from './Profile.jsx'
import Quizzes from './Quizzes.jsx'

import Navbar from './components/Navbar'; // Adjust the path as necessary
import Sidebar from './components/Sidebar.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import '../index.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
          <Navbar /> {/* Add Navbar here */}
          <Sidebar /> {/* Add Sidebar here */}
      <Routes>
        <Route path ='/home' element={<Home />}></Route>
        <Route path ='/register' element={<Register />}></Route>
        <Route path ='/login' element={<Login />}></Route>
        <Route path ='/courses/*' element={<Courses />}></Route>
        <Route path ='/profile' element={<Profile />}></Route>
        <Route path ='/quizzes' element={<Quizzes />}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
