import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyC0W7QGGdLpZqbphBoMI-QTcKJNwgmJXG4",
  authDomain: "mobil-33a56.firebaseapp.com",
  databaseURL: "https://mobil-33a56-default-rtdb.firebaseio.com",
  projectId: "mobil-33a56",
  storageBucket: "mobil-33a56.appspot.com",
  messagingSenderId: "1066124279954",
  appId: "1:1066124279954:web:c6051811212b9ebf5f264b"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const dbRealTime=getDatabase(app)
