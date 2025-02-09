import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewLesson = () => {
  const { id } = useParams(); // Get the lesson ID from the URL parameters
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/lesson/get/${id}`
        );
        if (response.data.success) {
          setLesson(response.data.data);
        } else {
          setError("No lesson data available.");
        }
      } catch (error) {
        setError("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  useEffect(() => {
    if (!lesson || !lesson.lessonPdf) return;

    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/lesson/pdf/${lesson.lessonPdf}`,
          {
            responseType: "blob",
          }
        );

        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        setPdfUrl(URL.createObjectURL(pdfBlob));
      } catch (error) {
        setError("Failed to load PDF.");
      }
    };

    fetchPdf();
  }, [lesson]);

  if (loading) return <p>Loading lesson...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{lesson.lessonTitle}</h1>
      <p>{lesson.lessonContent}</p>

      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          style={{ border: "none" }}
        ></iframe>
      ) : (
        <p>No PDF available for this lesson.</p>
      )}

      {/* Link to take the quiz for this lesson */}
      <Link to={`/quiz/${lesson._id}`}>
        <button className="btn btn-primary">Take the Quiz</button>
      </Link>

      <Link to="/lessons-management">
        <button>Back to Lessons</button>
      </Link>
    </div>
  );
};

export default ViewLesson;
