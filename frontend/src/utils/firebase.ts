import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "selloraai-2add3.firebaseapp.com",
  projectId: "selloraai-2add3",
  storageBucket: "selloraai-2add3.firebasestorage.app",
  messagingSenderId: "427145474294",
  appId: "1:427145474294:web:0c58b8e4bb4f3ae60c7cd7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}