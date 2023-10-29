// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgXRzZ2hwk3pSd7oN38jZxcsVkQKzJAp8",
  authDomain: "med-vision-e85dd.firebaseapp.com",
  projectId: "med-vision-e85dd",
  storageBucket: "med-vision-e85dd.appspot.com",
  messagingSenderId: "801747504516",
  appId: "1:801747504516:web:7bd13c1a335a04b105e1d1",
  measurementId: "G-M7MGMJZ7VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app); 