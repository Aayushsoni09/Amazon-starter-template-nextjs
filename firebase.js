// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCqdutC4i96gqASoae-50gZcV1mIcvb-R0",
    authDomain: "clone-a4e80.firebaseapp.com",
    projectId: "clone-a4e80",
    storageBucket: "clone-a4e80.appspot.com",
    messagingSenderId: "709677469376",
    appId: "1:709677469376:web:d381c9a805fa4c127e6725",
    measurementId: "G-0EK288MWDE"
  };
  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore()
  
  export default db  