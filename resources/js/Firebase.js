// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCD9B8ec7hIUQ1dZTsBS-pVTfL-ZQZIcnU",
    authDomain: "softexpo-c7695.firebaseapp.com",
    projectId: "softexpo-c7695",
    storageBucket: "softexpo-c7695.appspot.com",
    messagingSenderId: "258274443556",
    appId: "1:258274443556:web:3ac30d89a0319e22b1b3b1",
    measurementId: "G-57FD5WRY9J"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider }
