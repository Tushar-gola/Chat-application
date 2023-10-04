// Import the functions you need from the SDKs you need
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

// const firebaseConfig = {
//   apiKey: "AIzaSyDOnocY_Bdszb4unMO_A-95HmxShmp5IGM",
//   authDomain: "gochat-33864.firebaseapp.com",
//   projectId: "gochat-33864",
//   storageBucket: "gochat-33864.appspot.com",
//   messagingSenderId: "875836109392",
//   appId: "1:875836109392:web:6ae18c7e44007d94c39755",
//   measurementId: "G-5G29ZKJ5K2",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};
