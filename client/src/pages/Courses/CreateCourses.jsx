import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseForm from "./CoursesForm";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    coursePrice: 0,
    teacher: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/teacher/get"
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          setTeachers(response.data.data); // Ensure it's an array
        } else {
          setError("Unexpected response structure");
        }
      } catch (err) {
        setError("Failed to load teachers");
      }
    };
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/course/create",
        formData
      );
      navigate("/courses");
    } catch (err) {
      const message = err.response ? err.response.data.message : err.message;
      setError(`Failed to create course: ${message}`);
    }
  };

  return (
    <div className="container">
      <h1>Create Course</h1>
      <CourseForm
        formData={formData}
        setFormData={setFormData}
        teachers={teachers}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateCourse;
