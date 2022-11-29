import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  onSnapshot,
} from 'firebase/firestore';
import getFirebaseConfig from './firebase-config';

// Saves a new message to Cloud Firestore.
async function addToDatabase(key, value) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), key), value);
  } catch (error) {
    console.error('Error writing to Firebase Database', error);
  }
}

async function updateDatabase(path, id, value) {
  // Add a new message entry to the Firebase database.
  try {
    const reference = doc(getFirestore(), path, id);
    await updateDoc(reference, value);
  } catch (error) {
    console.error('Error writing to Firebase Database', error);
  }
}

// Loads chat messages history and listens for upcoming ones.
function listenForCollectionChange(collectionName, onChange) {
  const recentQuery = query(collection(getFirestore(), collectionName));

  // Start listening to the query.
  onSnapshot(recentQuery, onChange);
}

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
const getUser = () => getAuth().currentUser;

initializeApp(getFirebaseConfig());
export {
  signIn,
  signOutUser,
  listenForAuthChange,
  addToDatabase,
  updateDatabase,
  listenForCollectionChange,
  getUser,
};
