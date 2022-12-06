import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
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

const signOutUser = () => signOut(getAuth());
const getUser = () => getAuth().currentUser;

export { listenForAuthChange, signUp, signInWithGoogle, signOutUser, getUser };
