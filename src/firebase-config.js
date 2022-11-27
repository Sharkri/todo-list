const config = {
  apiKey: 'AIzaSyBA9ew7OAuR6zk39f_2jBUZau4DvtB27bU',
  authDomain: 'todo-list-4aa13.firebaseapp.com',
  projectId: 'todo-list-4aa13',
  storageBucket: 'todo-list-4aa13.appspot.com',
  messagingSenderId: '879777691212',
  appId: '1:879777691212:web:7b479a0438c9ba0776a6e9',
  measurementId: 'G-56Q3C2VJLG',
};

export default function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
