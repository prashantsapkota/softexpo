// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdKeuz3moIQn5xcd0n-HBo-AAugajZuH8",
  authDomain: "gchatapplication.firebaseapp.com",
  projectId: "gchatapplication",
  storageBucket: "gchatapplication.appspot.com",
  messagingSenderId: "511303704854",
  appId: "1:511303704854:web:31c1c4651616e1b4ebf037",
  measurementId: "G-FF1CETLVZ3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }
