import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests
import '../../css/Courses.css'; // Optional: Add custom styles

const CreateCourse = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    courseTitle: '',
    courseDescription: '',
    coursePrice: 0,
    teacher: '', // This will store the teacher's ID
  });

  const [teachers, setTeachers] = useState([]); // State for teachers
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch teachers from the backend
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('/api/teacher'); // Adjust the endpoint as necessary
        setTeachers(response.data.teachers); // Assuming the response has a 'teachers' array
      } catch (err) {
        setError('Failed to fetch teachers.');
        console.error(err);
      }
    };

    fetchTeachers();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.courseTitle || !formData.coursePrice || !formData.teacher) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true); // Start loading
    setError(''); // Reset error

    try {
      // Send a POST request to your backend API
      const response = await axios.post('/api/course/create', formData);

      // If successful, navigate back to the courses page
      if (response.data.success) {
        navigate('/courses');
      } else {
        setError(response.data.message || 'Failed to create course.');
      }
    } catch (err) {
      setError('An error occurred while creating the course. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="create-course-container">
      <h1>Create New Course</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseTitle">Course Title</label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseDescription">Course Description</label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="coursePrice">Course Price</label>
          <input
            type="number"
            id="coursePrice"
            name="coursePrice"
            value={formData.coursePrice}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="teacher">Teacher</label>
          <select
            id="teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.teacherName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
