import {initializeApp, getApps} from 'firebase/app';
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'; // Add these imports
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const firebaseConfigDev = {
  apiKey: "AIzaSyAgaoylOp9UBYXLJFo0zVw_mFcqRSxd8P4",//process.env.REACT_APP_API_URL_DEV,
  authDomain: "dvt-weather-2025.firebaseapp.com",//process.env.REACT_APP_AUTH_DOMAIN_DEV,
  projectId: "dvt-weather-2025",//process.env.REACT_APP_PROJECT_ID_DEV,
  storageBucket: "dvt-weather-2025.firebasestorage.app",//process.env.REACT_APP_STORAGE_BUCKET_DEV,
  messagingSenderId: "780881340382", //process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
  appId: "1:780881340382:web:8f6f260ef05680e71bdf4f",//process.env.REACT_APP_APP_ID_DEV,
  appVerificationDisabledForTesting: true,
};

// Checking if firebase app already exist.
const initializeFirebaseApp = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfigDev);
  } else {
    return getApps()[0];
  }
};

const firebaseApp = initializeFirebaseApp();

// Get instances of Auth, Firestore, and Storage
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {
  firebaseApp, auth, firestore, storage,
};
