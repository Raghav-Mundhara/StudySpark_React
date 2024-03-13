// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClAUTncjhImm9qhkd8a31gD3OEp0f_7ms",
  authDomain: "studysparkreact.firebaseapp.com",
  projectId: "studysparkreact",
  storageBucket: "studysparkreact.appspot.com",
  messagingSenderId: "567943790242",
  appId: "1:567943790242:web:c3be962b1cb3e4ced661fb",
  measurementId: "G-VW004G8RQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
export const storage = getStorage(app);
export {app,auth,db};