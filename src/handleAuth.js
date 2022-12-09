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
const signInGoogleButtons = document.querySelectorAll('.sign-in-with-google');
const goToSignInPage = document.querySelector('.go-to-sign-in-page');
const signInEmailError = document.querySelector('.sign-in-page .email-invalid');
const signInPassword = document.querySelector('#sign-in-password');
const signInEmail = document.querySelector('#sign-in-email');

function goToPage(page) {
  const currentPage = document.querySelector('.page:not(.hidden)');
  currentPage.classList.add('hidden');
  page.classList.remove('hidden');
}

function clearError(errorElement) {
  errorElement.textContent = '';
}

function goToSignUp() {
  goToPage(signUpPage);
  clearError(signUpEmailError);
}

function goToSignIn() {
  goToPage(signInPage);
  clearError(signInEmailError);
}

function login(user) {
  // Display username and pic
  username.textContent = user.displayName;
  userPic.src = user.photoURL || '/images/profile_placeholder.png';
  goToPage(mainPage);
}

function getErrorMessage(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email is already in use';

    case 'auth/invalid-email':
    case 'auth/missing-email':
      return 'Please enter a valid email';

    case 'auth/wrong-password':
      return 'Incorrect password entered';

    case 'auth/too-many-requests':
      return 'Too many requests';

    default:
      console.error('Unknown code:', error.code);
      return 'An unexpected error occurred';
  }
}

function isValidInputs(...inputs) {
  return inputs.every((input) => input.checkValidity());
}

const displayError = (element, error) => {
  element.textContent = getErrorMessage(error);
};

async function handleSignUp() {
  if (!isValidInputs(signUpEmail, signUpPassword)) return;
  signUpButton.disabled = true;

  try {
    await signUp(signUpEmail.value, signUpPassword.value);
  } catch (error) {
    displayError(signUpEmailError, error);
  } finally {
    signUpButton.disabled = false;
  }
}

async function handleSignIn() {
  if (!isValidInputs(signInEmail, signInPassword)) return;
  signInButton.disabled = true;

  try {
    await signIn(signInEmail.value, signInPassword.value);
  } catch (error) {
    displayError(signInEmailError, error);
  } finally {
    signInButton.disabled = false;
  }
}
signUpButton.addEventListener('click', handleSignUp);
signInButton.addEventListener('click', handleSignIn);
signInGoogleButtons.forEach((btn) =>
  btn.addEventListener('click', signInWithGoogle)
);
signOutButton.addEventListener('click', signOutUser);
goToSignUpPage.addEventListener('click', goToSignUp);
goToSignInPage.addEventListener('click', goToSignIn);

function listenForSignIn(onSignInListener) {
  // Listen for auth state change
  listenForAuthChange((user) => {
    // on auth change, check if user signed out or in
    if (!user) {
      goToSignIn();
    } else {
      login(user);
      onSignInListener(user);
    }
  });
}
export default listenForSignIn;
