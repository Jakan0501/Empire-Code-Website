import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Courses from './pages/Courses/Courses.jsx'
import Profile from './Profile.jsx'
import Quizzes from './pages/Quizzes/Quizzes.jsx'

import CreateCourse from './pages/Courses/CreateCourses.jsx';

import Navbar from './components/Navbar'; // Adjust the path as necessary
import Sidebar from './components/Sidebar.jsx';


// Importing Quizz CRUDS:
import CreateQuizzes from './pages/Quizzes/Create_Quizzes.jsx';
import QuizManagement from './pages/Quizzes/QuizManagement'; 
import EditQuiz from './pages/Quizzes/EditQuiz'; 

//Importing Lesson CRUDS:
import CreateLesson from './pages/Lessons/CreateLesson';
import LessonManagement from './pages/Lessons/LessonManagement';
import EditLesson from './pages/Lessons/EditLesson';
import ViewLesson from './pages/Lessons/ViewLesson.jsx';





import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import '../index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar /> {/* Add Navbar here */}
      <Sidebar /> {/* Add Sidebar here */}
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/quizzes" element={<Quizzes />}></Route>

        <Route path="/create-quiz" element={<CreateQuizzes />} />
        <Route path="/quizzes-management" element={<QuizManagement />} />
        <Route path="/quizzes/update/:id" element={<EditQuiz />} />

        <Route path="/create-lesson" element={<CreateLesson />} />
        <Route path="/lessons-management" element={<LessonManagement />} />
        <Route path="/lessons/update/:id" element={<EditLesson />} />
        <Route path="/view-lesson/:id" element={<ViewLesson />} />

        <Route path="/createCourse" element={<CreateCourse />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App
