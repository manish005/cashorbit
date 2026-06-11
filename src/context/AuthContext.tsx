import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  initializing: boolean;
  hasStarted: boolean;
  startApp: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [hasStarted, setHasStarted] = useState(() => {
    return localStorage.getItem('cashorbit_has_started') === 'true';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoggedIn(true);
        // If they are logged in, they have definitely started the app
        setHasStarted(true);
        localStorage.setItem('cashorbit_has_started', 'true');
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const startApp = () => {
    setHasStarted(true);
    localStorage.setItem('cashorbit_has_started', 'true');
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
      setHasStarted(false);
      localStorage.removeItem('cashorbit_has_started');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        initializing,
        hasStarted,
        startApp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
