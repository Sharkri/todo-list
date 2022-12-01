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
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import getFirebaseConfig from './firebase-config';

// Saves a new value to Cloud Firestore.
async function addToDatabase(key, value) {
  // Add a new entry to the Firebase database.
  try {
    return await addDoc(collection(getFirestore(), key), value);
  } catch (error) {
    console.error('Error writing to Firebase Database', error);
  }

  return null;
}

async function updateDatabase(path, value) {
  // Update an entry in the Firebase database.
  try {
    const reference = doc(getFirestore(), path);
    await updateDoc(reference, value);
  } catch (error) {
    console.error('Error writing to Firebase Database', error);
  }
}

async function deleteInDatabase(path, id) {
  // Delete an entry in the Firebase database.
  try {
    const reference = doc(getFirestore(), path, id);
    await deleteDoc(reference);
  } catch (error) {
    console.error('Error deleting to Firebase Database', error);
  }
}

// Queries for a given collection name and listens for new changes on it.
function listenForCollectionChange(collectionName, onChange) {
  const recentQuery = query(collection(getFirestore(), collectionName));

  // Start listening to the query.
  onSnapshot(recentQuery, onChange);
}

async function getCollectionDocs(collectionName) {
  const { docs } = await getDocs(collection(getFirestore(), collectionName));
  return docs.map((document) => document.data());
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
  deleteInDatabase,
  getCollectionDocs,
};
