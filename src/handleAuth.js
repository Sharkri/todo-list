import { listenForAuthChange, signInWithGoogle, signOutUser } from './auth';

const signInPage = document.querySelector('.sign-in-page');
const mainPage = document.querySelector('.main-page');
const username = document.querySelector('.user-name');
const userPic = document.querySelector('.user-pic');
const signUpPage = document.querySelector('.sign-up-page');
const signInWithGoogleBtn = document.querySelector('.sign-in-with-google');
const signOutButton = document.querySelector('.sign-out');
const goToSignUpPage = document.querySelector('.go-to-sign-up-page');
const goToSignInPage = document.querySelector('.go-to-sign-in-page');

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

signInWithGoogleBtn.addEventListener('click', signInWithGoogle);
signOutButton.addEventListener('click', signOutUser);
goToSignUpPage.addEventListener('click', () => goToPage(signUpPage));
goToSignInPage.addEventListener('click', () => goToPage(signInPage));

function listenForSignIn(onSignIn) {
  // Listen for auth state change
  listenForAuthChange((user) => {
    // user is not signed in
    if (!user) {
      signOutOfPage();
    }
    // user is signed in
    else {
      signInToPage(user);
      onSignIn(user);
    }
  });
}
export default listenForSignIn;
