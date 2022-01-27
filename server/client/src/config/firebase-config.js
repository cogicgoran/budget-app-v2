import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function signUp(email, password){
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle(){
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export async function signInWithFacebook(){
  return signInWithPopup(auth, new FacebookAuthProvider());
}

export async function signIn(email, password){
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logOut(){
  return signOut(auth);
}

// export const auth = app.auth();
export default app;