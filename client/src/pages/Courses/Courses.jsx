import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pfpKevin from "../../assets/images/pic-kevin.jpg"; 
import pfpLucas from "../../assets/images/pic-lucas.jpg"; 
import pfpIrfan from "../../assets/images/pic-irfan.jpg"; 
import pic_chatbot from "../../assets/images/pic-chatbot.jpeg";
import pic_AIimage from "../../assets/images/pic-AI_image.jpg";
import pic_classifier from "../../assets/images/pic-classifier.jpeg";
import pic_search from "../../assets/images/pic-search.jpeg";
import pic_filter from "../../assets/images/pic-filter.png";
import pic_rps from "../../assets/images/pic-rps.jpeg";
import '../../css/Courses.css';

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    // Old static courses
    const oldCourses = [
        {
            _id: "static1",
            teacherName: "Kevin Tong",
            createdAt: "2022-10-21",
            thumbnail: pic_chatbot,
            courseTitle: "AI Chatbot",
            courseDescription: "Learn to build a chatbot with AI.",
        },
        {
            _id: "static2",
            teacherName: "Kevin Tong",
            createdAt: "2022-10-21",
            thumbnail: pic_AIimage,
            courseTitle: "AI Image Generator",
            courseDescription: "Generate AI-powered images.",
        },
        {
            _id: "static3",
            teacherName: "Lucas Do",
            createdAt: "2022-10-21",
            thumbnail: pic_classifier,
            courseTitle: "AI Image Classifier",
            courseDescription: "Train AI to classify images.",
        },
        {
            _id: "static4",
            teacherName: "Lucas Do",
            createdAt: "2022-10-21",
            thumbnail: pic_search,
            courseTitle: "AI Searching Bot",
            courseDescription: "Create an AI-powered search bot.",
        },
        {
            _id: "static5",
            teacherName: "Kevin Tong",
            createdAt: "2022-10-21",
            thumbnail: pic_filter,
            courseTitle: "AI Input Filtering System",
            courseDescription: "Filter inputs using AI.",
        },
        {
            _id: "static6",
            teacherName: "Irfan",
            createdAt: "2022-10-21",
            thumbnail: pic_rps,
            courseTitle: "AI Rock Paper Scissors",
            courseDescription: "Build an AI RPS game.",
        },
    ];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/course/get');
                setCourses(response.data.data);
            } catch (error) {
                setError('Failed to fetch courses.');
            }
        };

        fetchCourses();
    }, []);

    return (
        <section className="courses">
            <div className="header-container">
                <h1 className="heading">Our Courses</h1>
                <button onClick={() => navigate('/createCourse')} className="inline-btn">
                    Create New Course
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="box-container">
                {[...oldCourses, ...courses].map(course => (
                    <div className="box" key={course._id}>
                        <div className="tutor">
                            <img src={
                                course.teacherName === "Kevin Tong" ? pfpKevin :
                                course.teacherName === "Lucas Do" ? pfpLucas :
                                pfpIrfan
                            } alt={course.teacherName || "Unknown Teacher"} />
                            <div className="info">
                                <h3>{course.teacherName || 'Unknown Teacher'}</h3>
                                <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="thumb">
                            <img src={course.thumbnail || 'default-image.jpg'} alt="Course Thumbnail" />
                        </div>
                        <h3 className="title">{course.courseTitle}</h3>
                        <p>{course.courseDescription}</p>
                        <div className="button-group">
                            <button className="view-btn">View</button>
                            <button className="update-btn">Update</button>
                            <button className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Courses;
