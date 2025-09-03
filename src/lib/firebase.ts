'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyABIMubCSQUjxmJU3pOY_dy_Ui8JAlVh5E",
  authDomain: "kvm-cloud-rentals.firebaseapp.com",
  projectId: "kvm-cloud-rentals",
  storageBucket: "kvm-cloud-rentals.appspot.com",
  messagingSenderId: "186409941941",
  appId: "1:186409941941:web:026fe4d5f285a2b6a3f7fc",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
