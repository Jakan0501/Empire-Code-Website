import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Profile from "./Profile.jsx";
import Quizzes from "./pages/Quizzes/Quizzes.jsx";

import CreateCourse from './pages/Courses/CreateCourses.jsx';
import UpdateCourse from './pages/Courses/EditCourses.jsx'
import ViewCourse from './pages/Courses/ViewCourse.jsx'


import Navbar from "./components/Navbar"; // Adjust the path as necessary
import Sidebar from "./components/Sidebar.jsx";

// Importing Quiz CRUDS:
import CreateQuizzes from "./pages/Quizzes/Create_Quizzes.jsx";
import QuizManagement from "./pages/Quizzes/QuizManagement";
import EditQuiz from "./pages/Quizzes/EditQuiz";
import QuizPage from "./pages/Quizzes/QuizPage";

// Importing Lesson CRUDS:
import CreateLesson from "./pages/Lessons/CreateLesson";
import LessonManagement from "./pages/Lessons/LessonManagement";
import EditLesson from "./pages/Lessons/EditLesson";
import ViewLesson from "./pages/Lessons/ViewLesson.jsx";

import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

import TeacherLogin from "./teacherLogin.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";

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
        <Route path="/teacherLogin" element={<TeacherLogin />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/quizzes" element={<Quizzes />}></Route>

        <Route path="/create-quiz" element={<CreateQuizzes />} />
        <Route path="/quizzes-management" element={<QuizManagement />} />
        <Route path="/quizzes/update/:id" element={<EditQuiz />} />
        <Route path="/quiz/:lessonId" element={<QuizPage />} />


        <Route path="/create-lesson" element={<CreateLesson />} />
        <Route path="/lessons-management" element={<LessonManagement />} />
        <Route path="/lessons/update/:id" element={<EditLesson />} />
        <Route path="/view-lesson/:id" element={<ViewLesson />} />

        {/* Route for taking quizzes of a specific lesson */}
        <Route path="/quiz/:lessonId" element={<Quizzes />} /> {/* This should show quizzes for a specific lesson */}

        <Route path="/createCourse" element={<CreateCourse />}/>
        <Route path="/courses/update/:id" element={<UpdateCourse />}/>
        <Route path="/viewCourse/:id" element={<UpdateCourse />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
