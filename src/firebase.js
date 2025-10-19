import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5dO5WOoBY-I93aBrmf_oVbyfEr1vzbvM",
  authDomain: "fitness-learning-muscle.firebaseapp.com",
  projectId: "fitness-learning-muscle",
  storageBucket: "fitness-learning-muscle.firebasestorage.app",
  messagingSenderId: "91119008505",
  appId: "1:91119008505:web:74ece3fbe39433e43a8028",
  measurementId: "G-XYSW7RV0G3"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
