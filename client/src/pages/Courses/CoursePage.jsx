import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/Courses.css';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState({});
  const [error, setError] = useState(null);
  const [loadingLessons, setLoadingLessons] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/course/get');
        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          setError('Failed to fetch courses');
        }
      } catch (error) {
        setError('Error fetching courses');
      }
    };

    fetchCourses();
  }, []);

  const fetchLessons = async (courseId) => {
    setLoadingLessons(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/lesson/course/${courseId}`);
      if (response.data.success) {
        setLessons((prev) => ({ ...prev, [courseId]: response.data.data }));
      } else {
        setError('No lessons found for this course.');
      }
    } catch (error) {
      setError('Failed to load lessons.');
    } finally {
      setLoadingLessons(false);
    }
  };

  return (
    <section className="courses">
      <div className="header-container">
        <h1 className="heading">Our Courses</h1>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="box-container">
        {courses.map((course) => (
          <div className="box" key={course._id}>
            <h2a>{course.courseTitle}</h2a>
            <p className="teacher-name">Teacher: {course.teacher?.teacherName || 'N/A'}</p>
            <button onClick={() => fetchLessons(course._id)}>View Lessons</button>

            {loadingLessons && <p>Loading lessons...</p>}
            {lessons[course._id] && lessons[course._id].length > 0 && (
              <div>
                <h3>Lessons:</h3>
                <ul>
                  {lessons[course._id].map((lesson) => (
                    <li key={lesson._id}>
                      <Link to={`/view-lesson/${lesson._id}`}>
                        <button>View {lesson.lessonTitle}</button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursePage;
