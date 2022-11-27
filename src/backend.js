import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import getFirebaseConfig from './firebase-config';

function authStateObserver(user) {
  if (user) {
    // Get user's profile picture and name
    const profilePictureURL = getAuth().currentUser.photoURL;
    const username = getAuth().currentUser.displayName;
  }
}

// Initialize firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

const signOutUser = () => signOut(getAuth());

initializeApp(getFirebaseConfig());
initFirebaseAuth();

export { signIn, signOutUser };
