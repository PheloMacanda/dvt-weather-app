import {initializeApp, getApps} from 'firebase/app';
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'; // Add these imports
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const firebaseConfigDev = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
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
