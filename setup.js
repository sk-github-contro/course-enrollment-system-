const fs = require('fs');
const path = require('path');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, 'backend', '.env');
const envExamplePath = path.join(__dirname, 'backend', '.env.example');

if (!fs.existsSync(envPath)) {
  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/course_enrollment
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
NODE_ENV=development`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n🚀 Setup complete!');
console.log('\nNext steps:');
console.log('1. Make sure MongoDB is running');
console.log('2. Run: npm run seed (to populate database)');
console.log('3. Run: npm run dev (to start both frontend and backend)');
console.log('\nDemo credentials:');
console.log('Email: john@example.com');
console.log('Password: password123');
