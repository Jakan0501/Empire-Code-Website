import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Sidebar from './components/Sidebar'; 

// Import images
import coursesImg from './assets/images/courses.png';
import quizImg from './assets/images/quiz.png';
import teacherImg from './assets/images/teacher.jpg';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <main className="home-content">
          {/* Quick Options Section */}
          <section className="home-grid">
            <h1 className="heading">Quick Options</h1>
            <div className="box-container">
              <div className="box square-box">
                <img src={coursesImg} alt="Courses" className="option-image" />
                <h3 className="title">Courses</h3>
                <Link to="/course-page" className="inline-btn">
                  View Courses
                </Link>
              </div>
              <div className="box square-box">
                <img src={quizImg} alt="Quizzes" className="option-image" />
                <h3 className="title">Quizzes</h3>
                <Link to="/lesson-page" className="inline-btn">
                  View Quizzes
                </Link>
              </div>
              <div className="box square-box">
                <img src={teacherImg} alt="Teachers" className="option-image" />
                <h3 className="title">Teachers</h3>
                <Link to="/all-teachers" className="inline-btn">
                  View Teachers
                </Link>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="courses">
            <h1 className="heading">Our Courses</h1>
            <div className="box-container">
              <div className="box">
                <h3 className="course-title">Introduction to AI</h3>
                <p>
                  Learn the basics of AI and its applications in the real world.
                </p>
                <Link to="/courses/intro-to-ai" className="inline-btn">
                  View Course
                </Link>
              </div>
              <div className="box">
                <h3 className="course-title">AI Image Generator</h3>
                <p>
                  Understand the principles behind image generation using AI.
                </p>
                <Link to="/courses/ai-image-generator" className="inline-btn">
                  View Course
                </Link>
              </div>
            </div>
            <div className="more-btn">
              <Link to="/courses" className="inline-option-btn">
                View All Courses
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
