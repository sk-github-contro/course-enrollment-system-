#!/bin/bash

# Set MongoDB URI environment variable
export MONGODB_URI="mongodb+srv://sohamUlwe305:Soham305Ulwe@clusterulwe.49hjd.mongodb.net/course_enrollment?retryWrites=true&w=majority&appName=clusterUlwe"
export JWT_SECRET="your_jwt_secret_key_here_change_this_in_production"
export NODE_ENV="development"
export PORT="5000"

echo "🚀 Starting Course Enrollment System with MongoDB Atlas..."
echo "📊 MongoDB URI: $MONGODB_URI"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install && cd ..
fi

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run seed

# Start the application
echo "🎯 Starting the application..."
npm run dev
