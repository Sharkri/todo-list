import {
  listenForAuthChange,
  signInWithGoogle,
  signOutUser,
  signUp,
  signIn,
} from './auth';

const mainPage = document.querySelector('.main-page');
const username = document.querySelector('.user-name');
const userPic = document.querySelector('.user-pic');
const signOutButton = document.querySelector('.sign-out');
// Sign up selectors
const signUpPage = document.querySelector('.sign-up-page');
const goToSignUpPage = document.querySelector('.go-to-sign-up-page');
const signUpButton = document.querySelector('.sign-up');
const signUpEmail = document.querySelector('#sign-up-email');
const signUpPassword = document.querySelector('#sign-up-password');
const signUpEmailError = document.querySelector('.sign-up-page .email-invalid');
// Sign in selectors
const signInPage = document.querySelector('.sign-in-page');
const signInButton = document.querySelector('.sign-in');
const signInWithGoogleBtn = document.querySelector('.sign-in-with-google');
const goToSignInPage = document.querySelector('.go-to-sign-in-page');
const signInEmailError = document.querySelector('.sign-in-page .email-invalid');
const signInPassword = document.querySelector('#sign-in-password');
const signInEmail = document.querySelector('#sign-in-email');

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

function getEmailErrorMessage(error) {
  if (error.code === 'auth/email-already-in-use') {
    return 'Email is already in use';
  }
  if (
    error.code === 'auth/invalid-email' ||
    error.code === 'auth/missing-email'
  ) {
    return 'Please enter a valid email';
  }
  // Unknown error
  console.error(error);
  return 'An unexpected error occurred';
}

async function handleSignUp() {
  // Check if valid inputs
  if (!signUpEmail.checkValidity() || !signUpPassword.checkValidity()) return;
  signUpButton.disabled = true;

  try {
    await signUp(signUpEmail.value, signUpPassword.value);
  } catch (error) {
    signUpEmailError.textContent = getEmailErrorMessage(error);
  }

  signUpButton.disabled = false;
}

async function handleSignIn() {
  // Check if valid inputs
  if (!signInEmail.checkValidity() || !signInPassword.checkValidity()) return;
  signInButton.disabled = true;

  try {
    await signIn(signInEmail.value, signInPassword.value);
  } catch (error) {
    signInEmailError.textContent = getEmailErrorMessage(error);
  }

  signInButton.disabled = false;
}
signUpButton.addEventListener('click', handleSignUp);
signInButton.addEventListener('click', handleSignIn);
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
