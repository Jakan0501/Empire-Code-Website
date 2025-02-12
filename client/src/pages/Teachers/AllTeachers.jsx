import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Teacher.css';

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/teacher/get');
        if (response.data.success) {
          setTeachers(response.data.data);
        } else {
          setError('Failed to fetch teachers');
        }
      } catch (error) {
        setError('Error fetching teachers');
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>All Teachers</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="teachers-container">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="teacher-card">
            <div className="teacher-name">Teacher: {teacher.teacherName}</div>
            <div className="teacher-email">Email: {teacher.teacherEmail}</div>
            <div className="teacher-phone">Phone no.: {teacher.teacherPhone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTeachers;
