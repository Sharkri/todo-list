import { initializeApp } from 'firebase/app';
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
  getDoc,
  orderBy,
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
  const recentQuery = query(
    collection(getFirestore(), collectionName),
    orderBy('timestamp', 'asc')
  );
  // Start listening to the query.
  return onSnapshot(recentQuery, onChange);
}

async function getCollectionDocs(collectionName) {
  const { docs } = await getDocs(collection(getFirestore(), collectionName));

  return docs.map((document) => document.data());
}

async function getDocData(path) {
  // Get a doc in the Firebase database.
  const reference = doc(getFirestore(), path);
  const docInfo = await getDoc(reference);
  return docInfo.data();
}

const initialize = () => initializeApp(getFirebaseConfig());
export {
  addToDatabase,
  updateDatabase,
  listenForCollectionChange,
  deleteInDatabase,
  getCollectionDocs,
  getDocData,
  initialize,
};
