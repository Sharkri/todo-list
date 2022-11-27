import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import getFirebaseConfig from './firebase-config';

// Initialize firebase auth
function listenForAuthChange(fn) {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), fn);
}

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

const signOutUser = () => signOut(getAuth());

initializeApp(getFirebaseConfig());

export { signIn, signOutUser, listenForAuthChange };
