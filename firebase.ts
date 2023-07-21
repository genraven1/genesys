import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import initializeApp = firebase.initializeApp;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmuXrpPveueT1m-KHvciMLtJ2GkFp4wpQ",
    authDomain: "geneys-60fba.firebaseapp.com",
    projectId: "geneys-60fba",
    storageBucket: "geneys-60fba.appspot.com",
    messagingSenderId: "184637649130",
    appId: "1:184637649130:web:dc49df2b12c5bfb8f36793"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);