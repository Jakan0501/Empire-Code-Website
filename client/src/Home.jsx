import React from 'react';
import Navbar from './components/Navbar'; // Navbar for the top
import Sidebar from './components/Sidebar'; // Sidebar for navigation
import { Link } from 'react-router-dom'; // React Router Link for navigation

const Home = () => {
  return (
    <>

      <div className="home-container">
        <Sidebar /> {/* Display Sidebar */}
        <main className="home-content">
          {/* Quick Options Section */}
          <section className="home-grid">
            <h1 className="heading">Quick Options</h1>
            <div className="box-container">
              <div className="box">
                <h3 className="title"></h3>
                <p className="likes">Theme: <span></span></p>
                <Link to="/something" className="inline-btn">View Something</Link>
                <p className="likes">Quiz: <span></span></p>
                <Link to="/something" className="inline-btn">View Something</Link>
                <p className="likes"> Topics <span></span></p>
                <Link to="/something" className="inline-btn">View Something</Link>
              </div>
              <div className="box">
                <h3 className="title">Top Categories</h3>
                <div className="flex">
                  <Link to="/category/ai-chatbot"><i className="fas fa-code"></i><span>AI Chatbot</span></Link>
                  <Link to="/category/ai-image-generator"><i className="fas fa-camera"></i><span>AI Image Generator</span></Link>
                  <Link to="/category/ai-detector"><i className="fas fa-cog"></i><span>AI Image Detector</span></Link>
                </div>
              </div>
              <div className="box">
                <h3 className="title">Popular Topics</h3>
                <div className="flex">
                  <Link to="/topic/html5"><i className="fab fa-html5"></i><span>MIT</span></Link>
                  <Link to="/topic/css3"><i className="fab fa-css3"></i><span>LEGO</span></Link>
                  <Link to="/topic/mit-app-inventor"><i className="fab fa-js"></i><span>MIT App Inventor</span></Link>
                </div>
              </div>
              <div className="box">
                <h3 className="title">Teachers</h3>
                <p className="tutor"></p>
                <Link to="/teachers" className="inline-btn">Button</Link>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="courses">
            <h1 className="heading">Our Courses</h1>
            <div className="box-container">
              <div className="box">
                <h3 className="course-title">Introduction to AI</h3>
                <p>Learn the basics of AI and its applications in the real world.</p>
                <Link to="/courses/intro-to-ai" className="inline-btn">View Course</Link>
              </div>
              <div className="box">
                <h3 className="course-title">AI Image Generator</h3>
                <p>Understand the principles behind image generation using AI.</p>
                <Link to="/courses/ai-image-generator" className="inline-btn">View Course</Link>
              </div>
              {/* Add more course boxes here */}
            </div>
            <div className="more-btn">
              <Link to="/courses" className="inline-option-btn">View All Courses</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
