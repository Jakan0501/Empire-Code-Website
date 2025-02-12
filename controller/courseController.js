import Course from '../models/courseModel.js'
import mongoose from 'mongoose'

export const getCourses = async(req, res) => {
    try {
        const courses = await Course.find({}).populate('teacher');
        res.status(200).json({ success: true, data: courses })
    } catch (error) {
        console.log('error in fetching courses:', error.message)
        res.status(500).json({success: false, message:'Server Error'})
    }
}


export const createCourse = async (req, res) => {
    let course = req.body;

    if (!course.courseTitle || !course.coursePrice) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    // ✅ If teacher is an empty string, set it to null
    if (!course.teacher || course.teacher === '') {
        course.teacher = null;
    }

    const newCourse = new Course(course);

    try {
        await newCourse.save();
        res.status(201).json({ success: true, data: newCourse });
    } catch (error) {
        console.error('Error in Create course:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const updateCourse = async(req, res) => {
    const{id} = req.params;

    const course = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:'Invalid Course Id'})
    }

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, course, {new: true})
        res.status(200).json({ success: true, data: updatedCourse})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

export const deleteCourse = async(req, res) =>{
    const {id} = req.params
    
    try {
        await Course.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:'Course Deleted'})
    } catch (error) {
        console.log('error in deleting courses:', error.message)
        res.status(500).json({ success: false, message:'Server Error'})
    }
}

export const getCourseById = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Course Id' });
    }

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        console.log('Error fetching course:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// In your courseController.js or a similar file
export const searchCourses = async (req, res) => {
    const { query } = req.query;
    try {
      const courses = await Course.find({
        title: { $regex: query, $options: "i" }, // Case-insensitive search
      });
  
      if (!courses.length) {
        return res.status(404).json({ success: false, message: "No courses found" });
      }
  
      res.status(200).json({ success: true, data: courses });
    } catch (error) {
      console.error("Error in searching courses:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
