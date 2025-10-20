# Course Enrollment System (MEAN + Firebase Auth)

A full-stack MEAN application for course enrollment, with Firebase Authentication (Email/Password and Google Sign-In). Students can browse a catalog, enroll in courses, and view enrolled courses in a dashboard.

## Features

- **Course Catalog**: Browse and view available courses
- **Authentication**: Firebase Auth (Email/Password, Google)
- **Course Enrollment**: Enroll in courses with Material dialog + snackbars
- **Student Dashboard**: View enrolled courses, dates, totals
- **Responsive Design**: Modern UI

## Tech Stack

- **Frontend**: Angular 18, TypeScript, SCSS, Angular Material
- **Auth**: Firebase Authentication (Email/Password, Google)
- **Backend**: Node.js, Express.js (port 5001 default)
- **Database**: MongoDB Atlas (Mongoose)

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd course-enrollment-system
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client && npm install && cd ..
   ```

3. **MongoDB Setup**
   The application is configured for your MongoDB Atlas cluster by default. To override:
   - Set `MONGODB_URI` when starting the backend.
   - Backend default port: `5001`.

4. **Quick Start**
   ```bash
   # Install all
   npm run install-all

   # Seed sample courses (optional)
   cd backend && npm run seed && cd ..

   # Start backend (port 5001)
   cd backend && MONGODB_URI="<your mongo uri optional>" npm start

   # Start frontend
   cd ../client && npm start  # http://localhost:4200
   ```

## Running the Application

### Development Mode

Backend: http://localhost:5001

Frontend: http://localhost:4200

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
Handled by Firebase on the frontend. Backend uses Firebase UID for enrollments; no JWT endpoints.

### Courses
- `GET /api/courses` - Get all available courses
- `GET /api/courses/:id` - Get a specific course

### Enrollments
- `POST /api/enroll` - Enroll in a course
- `GET /api/enroll/my-courses` - Get user's enrolled courses
- `GET /api/enroll/check/:userId/:courseId` - Check enrollment status

## Sample Data

The application comes with sample data including:

### Sample Users
- **Email**: john@example.com, **Password**: password123
- **Email**: jane@example.com, **Password**: password123

### Sample Courses
- Introduction to Artificial Intelligence
- Web Development with Angular
- Data Science Fundamentals
- Digital Marketing Strategy
- Python Programming Bootcamp
- UI/UX Design Principles

## Usage

1. **Register/Login**: Create an account or use the demo credentials
2. **Browse Courses**: View the course catalog with course details
3. **Enroll**: Click "Enroll" on any course to enroll
4. **Dashboard**: View your enrolled courses in the dashboard
5. **Continue Learning**: Access your courses from the dashboard

## Project Structure

```
course-enrollment-system/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Angular components
│   │   │   ├── services/   # Angular services
│   │   │   ├── models/     # TypeScript interfaces
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── models/                 # MongoDB models
├── routes/                 # Express.js routes
├── server.js              # Main server file
├── seedData.js            # Database seeding script
└── package.json
```

## Features Implemented

✅ **Course Catalog Page**
- Fetch and display courses from backend
- Course cards with title, instructor, duration
- Enroll button with confirmation dialog
- Disable enroll button if already enrolled

✅ **Enrollment System**
- POST enrollment to backend
- Confirmation dialog before enrollment
- Check enrollment status
- Prevent duplicate enrollments

✅ **Student Dashboard**
- List enrolled courses
- Show enrollment date
- Display total enrolled courses count
- Continue Learning button

✅ **Authentication**
- User registration and login
- JWT token-based authentication
- Protected routes
- User session management

✅ **Backend API**
- All required endpoints implemented
- MongoDB integration
- Data validation
- Error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
