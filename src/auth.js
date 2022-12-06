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
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch(console.error);
}

const signOutUser = () => signOut(getAuth());
const getUser = () => getAuth().currentUser;

export { listenForAuthChange, signUp, signInWithGoogle, signOutUser, getUser };
