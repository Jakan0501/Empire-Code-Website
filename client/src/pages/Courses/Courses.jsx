import React from 'react';
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
import CreateCourse from './CreateCourses';

const Courses = () => {

  return (
    <section className="courses">
      <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="heading">Our Courses</h1>
        <button onClick={handleCreateCourse} className="inline-btn">
          Create New Course
        </button>
      </div>

      <div className="box-container">

        <div className="box">
          <div className="tutor">
            <img src={pfpKevin} alt="Kevin Tong" />
            <div className="info">
              <h3>Kevin Tong</h3>
              <span>21-10-2022</span>
            </div>
          </div>
          <div className="thumb">
            <img src={pic_chatbot} alt="Course Thumbnail" />
          </div>
          <h3 className="title">AI Chatbot</h3>
          <a href="playlist.html" className="inline-btn">View Course</a>
        </div>

        <div className="box">
          <div className="tutor">
            <img src={pfpKevin} alt="Kevin Tong" />
            <div className="info">
              <h3>Kevin Tong</h3>
              <span>21-10-2022</span>
            </div>
          </div>
          <div className="thumb">
            <img src={pic_AIimage} alt="Course Thumbnail" />
          </div>
          <h3 className="title">AI Image Generator</h3>
          <a href="playlist.html" className="inline-btn">View Course</a>
        </div>

        <div className="box">
          <div className="tutor">
            <img src={pfpLucas} alt="Lucas Do" />
            <div className="info">
              <h3>Lucas Do</h3>
              <span>21-10-2022</span>
            </div>
          </div>
          <div className="thumb">
            <img src={pic_classifier} alt="Course Thumbnail" />
          </div>
          <h3 className="title">AI Image Classifier</h3>
          <a href="playlist.html" className="inline-btn">View Course</a>
        </div>

        <div className="box">
          <div className="tutor">
            <img src={pfpLucas} alt="Lucas Do" />
            <div className="info">
              <h3>Lucas Do</h3>
              <span>21-10-2022</span>
            </div>
          </div>
          <div className="thumb">
            <img src={pic_search} alt="Course Thumbnail" />
          </div>
          <h3 className="title">AI Searching Bot</h3>
          <a href="playlist.html" className="inline-btn">View Course</a>
        </div>

        <div className="box">
          <div className="tutor">
            <img src={pfpKevin} alt="Kevin Tong" />
            <div className="info">
              <h3>Kevin Tong</h3>
              <span>21-10-2022</span>
            </div>
          </div>
          <div className="thumb">
            <img src={pic_filter} alt="Course Thumbnail" />
          </div>
          <h3 className="title">AI Input Filtering System</h3>
          <a href="playlist.html" className="inline-btn">View Course</a>
        </div>

        <div className="box">
          <div className="tutor">
            <img src={pfpIrfan} alt="Irfan" />
            <div className="info">
              <h3>Irfan</h3>
              <span>21-10-2022</span>
            </div>
          </div>
          <div className="thumb">
            <img src={pic_rps} alt="Course Thumbnail" />
          </div>
          <h3 className="title">AI Rock Paper Scissors</h3>
          <a href="playlist.html" className="inline-btn">View Course</a>
        </div>
      </div>
    </section>
  );
};




export default Courses;
