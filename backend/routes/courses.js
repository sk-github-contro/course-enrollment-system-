const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/courses - Get all available courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error while fetching courses' });
  }
});

// GET /api/courses/:id - Get a specific course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error while fetching course' });
  }
});

// POST /api/courses - Create a new course (for admin/instructor use)
router.post('/', async (req, res) => {
  try {
    const { id, title, instructor, duration, description, price, category } = req.body;
    
    const course = new Course({
      id,
      title,
      instructor,
      duration,
      description,
      price,
      category
    });
    
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Course with this ID already exists' });
    } else {
      res.status(500).json({ message: 'Server error while creating course' });
    }
  }
});

module.exports = router;
