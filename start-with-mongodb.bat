@echo off

REM Set MongoDB URI environment variable
set MONGODB_URI=mongodb+srv://sohamUlwe305:Soham305Ulwe@clusterulwe.49hjd.mongodb.net/course_enrollment?retryWrites=true&w=majority&appName=clusterUlwe
set JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
set NODE_ENV=development
set PORT=5000

echo 🚀 Starting Course Enrollment System with MongoDB Atlas...
echo 📊 MongoDB URI: %MONGODB_URI%
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing root dependencies...
    npm install
)

if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend && npm install && cd ..
)

if not exist "client\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd client && npm install && cd ..
)

REM Seed the database
echo 🌱 Seeding database with sample data...
npm run seed

REM Start the application
echo 🎯 Starting the application...
npm run dev
