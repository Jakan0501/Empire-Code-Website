import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/TeacherControl.css';

const TeacherControl = () => {
  const navigate = useNavigate();

  return (
    <div className="teacher-control-container">
      <h1>Teacher Control Panel</h1>
      <div className="button-container">
        <button onClick={() => navigate('/courses')}>Manage Courses</button>
        <button onClick={() => navigate('/lessons-management')}>Manage Lessons</button>
        <button onClick={() => navigate('/quizzes-management')}>Manage Quizzes</button>
      </div>
    </div>
  );
};

export default TeacherControl;
