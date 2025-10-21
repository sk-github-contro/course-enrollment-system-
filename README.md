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
   git clone https://github.com/sk-github-contro/course-enrollment-system-.git
   cd course-enrollment-system
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (root, backend, frontend)
   npm run install-all
   ```

3. **Firebase Setup**
   - Create a Firebase project and enable Authentication (Email/Password + Google)
   - Copy your Firebase web config to `client/src/environments/environment.ts`
   - Add `localhost:4200` to Firebase Authorized domains

4. **Quick Start**
   ```bash
   # Seed sample courses (optional)
   cd backend && npm run seed && cd ..

   # Start backend (port 5001)
   cd backend && npm start

   # Start frontend (new terminal)
   cd client && npm start  # http://localhost:4200
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
- Firebase Authentication (Email/Password, Google Sign-In)
- Backend verifies Firebase ID tokens for enrollment endpoints
- No JWT endpoints; uses Firebase UID for user identification

### Courses
- `GET /api/courses` - Get all available courses
- `GET /api/courses/:id` - Get a specific course

### Enrollments (Protected - requires Firebase ID token)
- `POST /api/enroll` - Enroll in a course (requires Authorization: Bearer <token>)
- `GET /api/enroll/my-courses?userId=<uid>` - Get user's enrolled courses
- `GET /api/enroll/check/:userId/:courseId` - Check enrollment status

## Sample Data

The application comes with sample data including:

### Sample Users
Create accounts via Firebase Authentication (Email/Password or Google Sign-In)

### Sample Courses
- Introduction to Artificial Intelligence
- Web Development with Angular
- Data Science Fundamentals
- Digital Marketing Strategy
- Python Programming Bootcamp
- UI/UX Design Principles

## Usage

1. **Register/Login**: Create an account via Firebase (Email/Password or Google)
2. **Browse Courses**: View the course catalog with course details
3. **Enroll**: Click "Enroll" → confirm in dialog → see success snackbar
4. **Dashboard**: View your enrolled courses, dates, and totals
5. **Continue Learning**: Access your courses from the dashboard

## Deployment

### Backend (Render)
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`
- Environment Variables: `PORT`, `MONGODB_URI`, `FIREBASE_SERVICE_ACCOUNT`

### Frontend (Vercel)
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist/client/browser`
- Update `environment.prod.ts` with your Render API URL

## Project Structure

```
course-enrollment-system/
├── backend/                # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # Express.js routes
│   ├── server.js          # Main server file
│   ├── seedData.js        # Database seeding script
│   └── package.json
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Angular components
│   │   │   ├── services/   # Angular services
│   │   │   ├── guards/     # Route guards
│   │   │   ├── models/     # TypeScript interfaces
│   │   │   └── ...
│   │   └── environments/   # Environment configs
│   └── package.json
└── package.json           # Root package.json
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
- Firebase Authentication (Email/Password, Google Sign-In)
- Protected routes with auth guards
- Firebase ID token verification on backend
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
