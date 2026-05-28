import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAHBl8FT0LaLjVRekl468lLBwEJ3NB0XQw',
  authDomain: 'fitcuisine.firebaseapp.com',
  projectId: 'fitcuisine',
  storageBucket: 'fitcuisine.firebasestorage.app',
  messagingSenderId: '307015364348',
  appId: '1:307015364348:web:17dc5d115ab858207a3179',
  measurementId: 'G-TY5HV2E0LK',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
