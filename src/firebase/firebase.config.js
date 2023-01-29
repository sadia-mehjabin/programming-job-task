// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN5ymgnNS2xiK6RegLxJxD7ONQO9OXNCY",
  authDomain: "programming-job-task.firebaseapp.com",
  projectId: "programming-job-task",
  storageBucket: "programming-job-task.appspot.com",
  messagingSenderId: "791013633183",
  appId: "1:791013633183:web:94cac7422b8a1d4739c6aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;