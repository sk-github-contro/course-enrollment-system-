const mongoose = require('mongoose');
const Course = require('./models/Course');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sohamUlwe305:Soham305Ulwe@clusterulwe.49hjd.mongodb.net/course_enrollment?retryWrites=true&w=majority&appName=clusterUlwe';

const sampleCourses = [
  {
    id: 'course01',
    title: 'Introduction to Artificial Intelligence',
    instructor: 'Dr. Smith',
    duration: '6 weeks',
    description: 'Learn the fundamentals of AI, machine learning, and neural networks.',
    price: 299,
    category: 'Technology'
  },
  {
    id: 'course02',
    title: 'Web Development with Angular',
    instructor: 'Sarah Johnson',
    duration: '8 weeks',
    description: 'Master modern web development using Angular, Node.js, and MongoDB.',
    price: 399,
    category: 'Web Development'
  },
  {
    id: 'course03',
    title: 'Data Science Fundamentals',
    instructor: 'Prof. Chen',
    duration: '10 weeks',
    description: 'Comprehensive introduction to data analysis, visualization, and machine learning.',
    price: 499,
    category: 'Data Science'
  },
  {
    id: 'course04',
    title: 'Digital Marketing Strategy',
    instructor: 'Mike Rodriguez',
    duration: '4 weeks',
    description: 'Learn effective digital marketing strategies for modern businesses.',
    price: 199,
    category: 'Marketing'
  },
  {
    id: 'course05',
    title: 'Python Programming Bootcamp',
    instructor: 'Dr. Williams',
    duration: '12 weeks',
    description: 'Complete Python programming course from basics to advanced topics.',
    price: 349,
    category: 'Programming'
  },
  {
    id: 'course06',
    title: 'UI/UX Design Principles',
    instructor: 'Emma Davis',
    duration: '6 weeks',
    description: 'Master user interface and user experience design principles.',
    price: 279,
    category: 'Design'
  }
];

const sampleUsers = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'student'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample courses
    await Course.insertMany(sampleCourses);
    console.log('Inserted sample courses');

    // Insert sample users
    await User.insertMany(sampleUsers);
    console.log('Inserted sample users');

    console.log('Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Email: john@example.com, Password: password123');
    console.log('Email: jane@example.com, Password: password123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();
