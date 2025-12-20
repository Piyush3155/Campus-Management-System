"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, User as FirebaseUser, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { 
  loginWithCredentials, 
  loginWithFirebase, 
  validateToken, 
  refreshToken,
  type AuthUser, 
} from "@/lib/auth-api";

// Storage keys
const TOKEN_KEY = "cms_access_token";
const USER_KEY = "cms_user";

/**
 * Unified user type for the application
 */
interface AppUser extends AuthUser {
  firebaseUser?: FirebaseUser | null;
}

interface AuthContextType {
  user: AppUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  
  // Auth methods
  loginCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  
  // Role checks
  isAdmin: boolean;
  isStaff: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
  loginCredentials: async () => ({ success: false }),
  loginGoogle: async () => ({ success: false }),
  logout: async () => {},
  isAdmin: false,
  isStaff: false,
  isStudent: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Save auth data to storage
   */
  const saveAuthData = useCallback((accessToken: string, userData: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
  }, []);

  /**
   * Clear auth data from storage
   */
  const clearAuthData = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  /**
   * Login with credentials (Admin/Staff)
   */
  const loginCredentials = useCallback(async (email: string, password: string) => {
    const result = await loginWithCredentials(email, password);
    
    if (result.success && result.data) {
      saveAuthData(result.data.access_token, result.data.user);
      return { success: true };
    }
    
    return { success: false, error: result.error };
  }, [saveAuthData]);

  /**
   * Login with Google (Students)
   * This is called after Firebase authentication is complete
   */
  const loginGoogle = useCallback(async () => {
    const firebaseUser = auth.currentUser;
    
    if (!firebaseUser) {
      return { success: false, error: "No Firebase user found" };
    }

    try {
      const idToken = await firebaseUser.getIdToken();
      const result = await loginWithFirebase(idToken);
      
      if (result.success && result.data) {
        saveAuthData(result.data.access_token, result.data.user);
        setUser(prev => prev ? { ...prev, firebaseUser } : null);
        return { success: true };
      }
      
      // If backend auth fails, sign out from Firebase
      await firebaseSignOut(auth);
      return { success: false, error: result.error };
    } catch (error) {
      console.error("Google login error:", error);
      await firebaseSignOut(auth);
      return { success: false, error: "Failed to authenticate with server" };
    }
  }, [saveAuthData]);

  /**
   * Logout - Clear all auth data
   */
  const logout = useCallback(async () => {
    try {
      // Sign out from Firebase if student
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (error) {
      console.error("Firebase signout error:", error);
    }
    clearAuthData();
  }, [clearAuthData]);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for stored token
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
          // Validate the stored token
          const validationResult = await validateToken(storedToken);
          
          if (validationResult.success && validationResult.data?.valid) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } else {
            // Try to refresh the token
            const refreshResult = await refreshToken(storedToken);
            
            if (refreshResult.success && refreshResult.data) {
              saveAuthData(refreshResult.data.access_token, refreshResult.data.user);
            } else {
              clearAuthData();
            }
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [saveAuthData, clearAuthData]);

  /**
   * Listen for Firebase auth state changes (for students)
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && user?.role === "STUDENT") {
        // Update firebase user reference
        setUser(prev => prev ? { ...prev, firebaseUser } : null);
      }
    });

    return () => unsubscribe();
  }, [user?.role]);

  // Role checks
  const isAdmin = user?.role === "ADMIN";
  const isStaff = user?.role === "STAFF";
  const isStudent = user?.role === "STUDENT";
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      loading, 
      isAuthenticated,
      loginCredentials,
      loginGoogle,
      logout,
      isAdmin,
      isStaff,
      isStudent,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
