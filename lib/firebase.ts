"use client"

// Import the Firebase compat version which has a different initialization pattern
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALu91sY5KuJpp9X7ML2KNvNuV8V0Eu8Ok",
  authDomain: "student-dashboard-28761.firebaseapp.com",
  projectId: "student-dashboard-28761",
  storageBucket: "student-dashboard-28761.firebasestorage.app",
  messagingSenderId: "1039057127811",
  appId: "1:1039057127811:web:48654f3ce868613bf54eb6",
  measurementId: "G-3C8GQ9SVP4",
}

// Initialize Firebase
let firebaseApp

// Check if Firebase has already been initialized
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.app()
}

// Export auth
const auth = firebase.auth()

export { auth, firebase }
