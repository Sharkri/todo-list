import {
  listenForAuthChange,
  signInWithGoogle,
  signOutUser,
  signUp,
  signIn,
  sendPassResetEmail,
} from './auth';
import { resetAllErrors, showInputError } from './formValidation';

const mainPage = document.querySelector('.main-page');
const username = document.querySelector('.user-name');
const userPic = document.querySelector('.user-pic');
const signOutButton = document.querySelector('.sign-out');
const goToSignUpPage = document.querySelector('.go-to-sign-up-page');
const goToSignInPageButtons = document.querySelectorAll('.go-to-sign-in-page');
const signInGoogleButtons = document.querySelectorAll('.sign-in-with-google');
const goToForgotPassPage = document.querySelector('.forgot-password');
const forgotPassPage = document.querySelector('.forgot-password-page');
const resetPassword = document.querySelector('.reset-password');
const resetPasswordEmail = document.querySelector('#forgot-password-email');
const resetPasswordError = document.querySelector(
  '.forgot-password-content .email-invalid'
);

const auth = {
  signIn: {
    email: document.querySelector('#sign-in-email'),
    password: document.querySelector('#sign-in-password'),
    passwordError: document.querySelector('.sign-in-page .pass-invalid'),
    emailError: document.querySelector('.sign-in-page .email-invalid'),
    page: document.querySelector('.sign-in-page'),
    submitButton: document.querySelector('.sign-in'),
    fn: signIn,
  },
  signUp: {
    email: document.querySelector('#sign-up-email'),
    password: document.querySelector('#sign-up-password'),
    passwordError: document.querySelector('.sign-up-page .pass-invalid'),
    emailError: document.querySelector('.sign-up-page .email-invalid'),
    page: document.querySelector('.sign-up-page'),
    submitButton: document.querySelector('.sign-up'),
    fn: signUp,
  },
};

function goToPage(page) {
  const currentPage = document.querySelector('.page:not(.hidden)');
  currentPage.classList.add('hidden');
  page.classList.remove('hidden');
  resetAllErrors();
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
      return 'Email is already in use.';

    case 'auth/invalid-email':
    case 'auth/missing-email':
      return 'Please enter a valid email.';

    case 'auth/wrong-password':
      return 'Incorrect password entered.';

    case 'auth/too-many-requests':
      return 'Too many requests.';

    case 'auth/user-not-found':
      return 'Email not found.';

    case 'auth/weak-password':
      return 'The password is too weak.';

    default:
      console.error('Unknown code:', error.code);
      return error.code;
  }
}

function isValidInputs(...inputs) {
  return inputs.every((input) => input.checkValidity());
}

const displayError = (errorElement, input, error) => {
  errorElement.textContent = getErrorMessage(error);
  showInputError(input, errorElement);
};

async function handleAuthentication(name) {
  const { email, emailError, password, passwordError, submitButton, fn } =
    auth[name];

  if (!isValidInputs(email, password)) return;
  submitButton.disabled = true;

  try {
    await fn(email.value, password.value);
  } catch (error) {
    if (error.code.includes('password')) {
      displayError(passwordError, password, error);
    } else displayError(emailError, email, error);
  } finally {
    submitButton.disabled = false;
  }
}

const handleSignUp = () => handleAuthentication('signUp');
const handleSignIn = () => handleAuthentication('signIn');

auth.signUp.submitButton.addEventListener('click', handleSignUp);
auth.signIn.submitButton.addEventListener('click', handleSignIn);
signInGoogleButtons.forEach((btn) =>
  btn.addEventListener('click', signInWithGoogle)
);
signOutButton.addEventListener('click', signOutUser);
goToSignUpPage.addEventListener('click', () => goToPage(auth.signUp.page));
goToSignInPageButtons.forEach((btn) =>
  btn.addEventListener('click', () => goToPage(auth.signIn.page))
);
goToForgotPassPage.addEventListener('click', () => goToPage(forgotPassPage));
resetPassword.addEventListener('click', async () => {
  const email = resetPasswordEmail;
  if (!email.checkValidity()) return;
  resetPassword.disabled = true;
  try {
    await sendPassResetEmail(email.value);
    // if the code above was successful, reset errors
    resetAllErrors();
  } catch (error) {
    displayError(resetPasswordError, email, error);
  } finally {
    resetPassword.disabled = false;
  }
});

export default function listenForSignIn(onSignInListener) {
  // Listen for auth state change
  listenForAuthChange((user) => {
    if (user == null) {
      // if user is not signed in, go to sign in page
      goToPage(auth.signIn.page);
    } else {
      login(user);
      onSignInListener(user);
    }
  });
}
