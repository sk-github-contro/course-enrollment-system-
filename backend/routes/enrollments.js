const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// GET /api/enroll/my-courses - Get enrolled courses for a user
router.get('/my-courses', async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const enrollments = await Enrollment.find({ userId }).sort({ enrolledAt: -1 });
    
    // Get course details for each enrollment
    const enrolledCourses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await Course.findOne({ id: enrollment.courseId });
        return {
          enrollment,
          course
        };
      })
    );
    
    res.json(enrolledCourses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Server error while fetching enrolled courses' });
  }
});

// POST /api/enroll - Enroll a user in a course
router.post('/', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    if (!userId || !courseId) {
      return res.status(400).json({ message: 'User ID and Course ID are required' });
    }
    
    // Check if course exists
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }
    
    // Create new enrollment
    const enrollment = new Enrollment({
      userId,
      courseId,
      enrolledAt: new Date()
    });
    
    await enrollment.save();
    
    res.status(201).json({
      message: 'Successfully enrolled in course',
      enrollment
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'User is already enrolled in this course' });
    } else {
      res.status(500).json({ message: 'Server error while enrolling in course' });
    }
  }
});

// GET /api/enroll/check/:userId/:courseId - Check if user is enrolled in a course
router.get('/check/:userId/:courseId', async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    
    const enrollment = await Enrollment.findOne({ userId, courseId });
    res.json({ isEnrolled: !!enrollment });
  } catch (error) {
    console.error('Error checking enrollment:', error);
    res.status(500).json({ message: 'Server error while checking enrollment' });
  }
});

module.exports = router;
