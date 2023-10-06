import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAd5dvaGeFZ06Vg8hLxXRb1uUH7_S6B2wg',
  authDomain: 'gochat-a67ed.firebaseapp.com',
  projectId: 'gochat-a67ed',
  storageBucket: 'gochat-a67ed.appspot.com',
  messagingSenderId: '1034398133531',
  appId: '1:1034398133531:web:e0ae5912a3d47664b6f7be',
  measurementId: 'G-9Z65GQBEVE',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};
