import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Profile from "./Profile.jsx";
import Quizzes from "./pages/Quizzes/Quizzes.jsx";

import CreateCourse from "./pages/Courses/CreateCourses.jsx";
import UpdateCourse from "./pages/Courses/EditCourses.jsx";

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
import LessonPage from "./pages/Lessons/LessonPage.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar /> {/* Add Navbar here */}
      <Sidebar /> {/* Add Sidebar here */}
      <Routes>
        <Route path="/teacherLogin" element={<TeacherLogin />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>

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
          path="/lesson-page"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
