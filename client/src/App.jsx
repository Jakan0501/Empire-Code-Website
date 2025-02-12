// App.js
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Profile from "./Profile.jsx";
import Quizzes from "./pages/Quizzes/Quizzes.jsx";

import CreateCourse from './pages/Courses/CreateCourses.jsx';
import UpdateCourse from './pages/Courses/EditCourses.jsx';
import ViewCourse from './pages/Courses/ViewCourse.jsx';
import CoursePage from './pages/Courses/CoursePage.jsx';

import Navbar from "./components/Navbar";
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
import LessonPage from "./pages/Lessons/LessonPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

import TeacherLogin from "./teacherLogin.jsx";
import TeacherPage from "./pages/Teachers/Teachers.jsx";
import CreateTeacher from "./pages/Teachers/createTeacher.jsx";
import UpdateTeacher from "./pages/Teachers/updateTeacher.jsx";
import ViewTeacher from "./pages/Teachers/viewTeacher.jsx";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";
import axios from "axios";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setUserName(userData.userName);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar userName={userName} />
      <Routes>
        <Route path="/teacherLogin" element={<TeacherLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <Quizzes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-quiz"
          element={
            <ProtectedRoute>
              <CreateQuizzes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes-management"
          element={
            <ProtectedRoute>
              <QuizManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes/update/:id"
          element={
            <ProtectedRoute>
              <EditQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:lessonId"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-lesson"
          element={
            <ProtectedRoute>
              <CreateLesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons-management"
          element={
            <ProtectedRoute>
              <LessonManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons/update/:id"
          element={
            <ProtectedRoute>
              <EditLesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-lesson/:id"
          element={
            <ProtectedRoute>
              <ViewLesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lesson-page"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createCourse"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/update/:id"
          element={
            <ProtectedRoute>
              <UpdateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewCourse/:id"
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teachers"
          element={
            <ProtectedRoute>
              <TeacherPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createteacher"
          element={
            <ProtectedRoute>
              <CreateTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/update/:id"
          element={
            <ProtectedRoute>
              <UpdateTeacher />
            </ProtectedRoute>
          }
          />
          <Route
          path="/viewTeacher/:id"
          element={
            <ProtectedRoute>
              <ViewTeacher />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
