import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

// Initialize firebase auth
function listenForAuthChange(fn) {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), fn);
}

async function signInWithGoogle() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signUp(email, password) {
  return createUserWithEmailAndPassword(getAuth(), email, password);
}
function signIn(email, password) {
  return signInWithEmailAndPassword(getAuth(), email, password);
}
const sendPassResetEmail = (email) => sendPasswordResetEmail(getAuth(), email);

const signOutUser = () => signOut(getAuth());
const getUser = () => getAuth().currentUser;

export {
  listenForAuthChange,
  signUp,
  signInWithGoogle,
  signIn,
  signOutUser,
  getUser,
  sendPassResetEmail,
};
