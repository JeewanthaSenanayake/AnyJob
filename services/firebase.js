import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD-dq8wNh5AkGUxKqq-6CFmSd77nLUEE2I",
    authDomain: "cmp--academy.firebaseapp.com",
    projectId: "cmp--academy",
    storageBucket: "cmp--academy.appspot.com",
    messagingSenderId: "261585075964",
    appId: "1:261585075964:web:2871cd9ae4c6fae20c2179",
    measurementId: "G-VP1DKTKDN6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the initialized Firebase instance
export default firebase;
