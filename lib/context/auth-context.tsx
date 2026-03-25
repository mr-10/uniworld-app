import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signup: (name: string, email: string, phone: string) => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (name: string, email: string, phone: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "user_profile";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, phone: string) => {
    try {
      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const login = async (email: string) => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.email === email) {
          setUser(parsedUser);
        } else {
          throw new Error("Email not found");
        }
      } else {
        throw new Error("No user found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const updateProfile = async (name: string, email: string, phone: string) => {
    try {
      if (!user) throw new Error("No user logged in");
      const updatedUser: UserProfile = {
        ...user,
        name,
        email,
        phone,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isSignedIn: !!user,
    signup,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
