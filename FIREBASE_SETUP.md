# Firebase Setup Guide

## ✅ Your Firebase Project is Already Created!

**Project ID**: `course-enrollment-system-2ba23`

## 1. Get Web App Configuration

Since you already have the service account key, you just need to get the web app configuration:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `course-enrollment-system-2ba23`
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. If you don't have a web app yet:
   - Click "Add app" and select Web app (</> icon)
   - Register your app with a nickname like "Course Enrollment Web"
6. Copy the Firebase configuration object

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web app (</> icon)
4. Register your app with a nickname like "Course Enrollment Web"
5. Copy the Firebase configuration object

## 4. Update Environment Files

Replace the placeholder values in these files with your actual Firebase config:

- `client/src/environments/environment.ts`
- `client/src/environments/environment.prod.ts`

**Current configuration (you need to fill in apiKey and appId):**
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC...", // ⚠️ GET THIS FROM FIREBASE CONSOLE
    authDomain: "course-enrollment-system-2ba23.firebaseapp.com",
    projectId: "course-enrollment-system-2ba23",
    storageBucket: "course-enrollment-system-2ba23.appspot.com",
    messagingSenderId: "117390124338488541667",
    appId: "1:117390124338488541667:web:..." // ⚠️ GET THIS FROM FIREBASE CONSOLE
  }
};
```

**What you need to get from Firebase Console:**
- `apiKey`: The Web API Key
- `appId`: The App ID (starts with `1:117390124338488541667:web:`)

## 5. Test Users (Optional)

You can create test users in Firebase Console:
1. Go to Authentication > Users
2. Click "Add user"
3. Enter email and password for testing

## 6. Security Rules (Optional)

For production, you might want to set up Firestore security rules, but for this project, we're only using Firebase Auth, so no additional rules are needed.

## 7. Start the Application

After updating the environment files:

```bash
# Terminal 1 - Backend
cd backend
MONGODB_URI="your-mongodb-uri" node server.js

# Terminal 2 - Frontend
cd client
npm start
```

The application will now use Firebase Authentication instead of the custom backend authentication!
