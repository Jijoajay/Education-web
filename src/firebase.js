import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOqMZVK3MvIrC8J1W8ZYWnx965QPYPKSU",
  authDomain: "education-web-files.firebaseapp.com",
  projectId: "education-web-files",
  storageBucket: "education-web-files.appspot.com",
  messagingSenderId: "7354155038",
  appId: "1:7354155038:web:05141b87467fed96396e0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app as default };
