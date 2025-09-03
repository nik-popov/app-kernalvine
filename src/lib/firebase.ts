import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'kvm-cloud-rentals',
  appId: '1:186409941941:web:026fe4d5f285a2b6a3f7fc',
  storageBucket: 'kvm-cloud-rentals.firebasestorage.app',
  apiKey: 'AIzaSyABIMubCSQUjxmJU3pOY_dy_Ui8JAlVh5E',
  authDomain: 'kvm-cloud-rentals.firebaseapp.com',
  messagingSenderId: '186409941941',
  measurementId: '',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
