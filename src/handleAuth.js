import {
  listenForAuthChange,
  signInWithGoogle,
  signOutUser,
  signUp,
} from './auth';

const signInPage = document.querySelector('.sign-in-page');
const mainPage = document.querySelector('.main-page');
const username = document.querySelector('.user-name');
const userPic = document.querySelector('.user-pic');
const signInWithGoogleBtn = document.querySelector('.sign-in-with-google');
const signOutButton = document.querySelector('.sign-out');
const goToSignUpPage = document.querySelector('.go-to-sign-up-page');
const goToSignInPage = document.querySelector('.go-to-sign-in-page');
// Sign up selectors
const signUpPage = document.querySelector('.sign-up-page');
const signUpButton = document.querySelector('.sign-up');
const signUpEmail = document.querySelector('#sign-up-email');
const signUpPassword = document.querySelector('#sign-up-password');
const emailError = document.querySelector('.email-invalid');

function goToPage(page) {
  const currentPage = document.querySelector('.page:not(.hidden)');
  currentPage.classList.add('hidden');
  page.classList.remove('hidden');
}

function signInToPage(user) {
  // Display username and pic
  username.textContent = user.displayName;
  userPic.src = user.photoURL || '/images/profile_placeholder.png';
  goToPage(mainPage);
}

const signOutOfPage = () => goToPage(signInPage);
async function handleSignUp() {
  // Check if valid inputs
  if (!signUpEmail.checkValidity() || !signUpPassword.checkValidity()) return;
  signUpButton.disabled = true;

  try {
    await signUp(signUpEmail.value, signUpPassword.value);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      emailError.textContent = 'Email is already in use';
    } else if (
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/missing-email'
    ) {
      emailError.textContent = 'Please enter a valid email';
    } else {
      // Unknown error
      emailError.textContent = 'An unexpected error occurred';
      console.error(error);
    }
  }

  signUpButton.disabled = false;
}

signUpButton.addEventListener('click', handleSignUp);
signInWithGoogleBtn.addEventListener('click', signInWithGoogle);
signOutButton.addEventListener('click', signOutUser);
goToSignUpPage.addEventListener('click', () => goToPage(signUpPage));
goToSignInPage.addEventListener('click', () => goToPage(signInPage));

function listenForSignIn(onSignIn) {
  // Listen for auth state change
  listenForAuthChange((user) => {
    if (!user) {
      signOutOfPage();
    } else {
      signInToPage(user);
      onSignIn(user);
    }
  });
}
export default listenForSignIn;
