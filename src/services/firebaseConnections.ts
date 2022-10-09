import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyACKcMO0BjOWMJLf0hJMwqbGfLXpO8kDkw",
  authDomain: "tasklist-fc67a.firebaseapp.com",
  projectId: "tasklist-fc67a",
  storageBucket: "tasklist-fc67a.appspot.com",
  messagingSenderId: "299846663922",
  appId: "1:299846663922:web:b747e140c5c42268c61a6b",
  measurementId: "G-N9MVJNB4FM"
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;