'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

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

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === '/';
    
    if (!user && !isAuthPage) {
      router.push('/');
    }
  }, [user, loading, router, pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
