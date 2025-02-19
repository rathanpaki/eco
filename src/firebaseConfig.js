import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC16Ygoq2PJ2YpcnWAzTKp5X9sjrIxtL_Y",
  authDomain: "eco-gifts.firebaseapp.com",
  databaseURL: "https://eco-gifts-default-rtdb.firebaseio.com",
  projectId: "eco-gifts",
  storageBucket: "eco-gifts.appspot.com",
  messagingSenderId: "820151617085",
  appId: "1:820151617085:web:8e629eee07b1d53b774c54",
  measurementId: "G-H0QK15N32Q",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
