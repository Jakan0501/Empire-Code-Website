import Lesson from '../models/lessonModel.js';
import Course from '../models/courseModel.js';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up multer storage to save files in "PDF_files" folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'PDF_files/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Ensure folder exists
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage }).single('lessonPdf'); // No file size limit

// Get all lessons
export const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({});
        res.status(200).json({ success: true, data: lessons });
    } catch (error) {
        console.error('Error fetching lessons:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create a lesson with PDF upload
export const createLesson = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Error uploading PDF' });
        }

        try {
            const { lessonTitle, lessonContent, course } = req.body;

            if (!lessonTitle || !course) {
                return res.status(400).json({ success: false, message: 'Lesson title and course are required' });
            }

            const newLesson = new Lesson({
                lessonTitle,
                lessonContent,
                course, // Store course reference
                lessonPdf: req.file ? req.file.filename : null
            });

            await newLesson.save();

            // Update the course to include the new lesson
            await Course.findByIdAndUpdate(course, {
                $push: { lessons: newLesson._id } // Push the lesson ID into the lessons array
            });

            res.status(201).json({ success: true, data: newLesson });
        } catch (error) {
            console.error('Error creating lesson:', error.message);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    });
};



// Get lesson by ID
export const getLessonById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: 'Invalid Lesson Id' });
        }

        const lesson = await Lesson.findById(id);
        if (!lesson) {
            return res.status(404).json({ success: false, message: 'Lesson not found' });
        }

        res.status(200).json({ success: true, data: lesson });
    } catch (error) {
        console.error('Error fetching lesson by ID:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Serve PDF file
export const getLessonPdf = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Requested PDF:", id);

        const lesson = await Lesson.findOne({ lessonPdf: id }); // Find by filename
        if (!lesson) {
            return res.status(404).json({ success: false, message: 'Lesson not found' });
        }

        const filePath = path.join('PDF_files', id);
        console.log("Serving PDF from:", filePath);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, message: 'PDF file not found' });
        }

        res.sendFile(path.resolve(filePath));
    } catch (error) {
        console.error('Error fetching PDF:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update lesson (including optional PDF update)
export const updateLesson = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Error uploading PDF' });
        }

        try {
            const { id } = req.params;
            const { course } = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ success: false, message: 'Invalid Lesson Id' });
            }

            const lesson = await Lesson.findById(id);
            if (!lesson) {
                return res.status(404).json({ success: false, message: 'Lesson not found' });
            }

            if (req.file && lesson.lessonPdf) {
                const oldFilePath = path.join('PDF_files', lesson.lessonPdf);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            const updatedLesson = await Lesson.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    course, // Allow course update
                    lessonPdf: req.file ? req.file.filename : lesson.lessonPdf
                },
                { new: true }
            );

            res.status(200).json({ success: true, data: updatedLesson });
        } catch (error) {
            console.error('Error updating lesson:', error.message);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    });
};


// Delete lesson (and remove PDF file)
export const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await Lesson.findById(id);

        if (!lesson) {
            return res.status(404).json({ success: false, message: 'Lesson not found' });
        }

        // Delete the associated PDF file
        if (lesson.lessonPdf) {
            const filePath = path.join('PDF_files', lesson.lessonPdf);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Lesson.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Lesson Deleted' });
    } catch (error) {
        console.error('Error deleting lesson:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};




export const getLessonsByCourse = async (req, res) => {
    try {
        const { id } = req.params; // Course ID

        // Find the course and populate the lessons
        const course = await Course.findById(id).populate('lessons');

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, data: course.lessons });
    } catch (error) {
        console.error('Error fetching lessons by course:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


