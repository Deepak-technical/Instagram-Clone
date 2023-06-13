// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3SMrUQiK_Bm0lJi5rru8BpGJPKK-FSGY",
  authDomain: "insta-2-aa918.firebaseapp.com",
  projectId: "insta-2-aa918",
  storageBucket: "insta-2-aa918.appspot.com",
  messagingSenderId: "601956668331",
  appId: "1:601956668331:web:396da5c5fa974bf15538ee"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig):getApp();
const db=getFirestore();
const storage=getStorage();
export{app,db,storage}