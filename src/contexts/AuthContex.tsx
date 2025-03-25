import React, { createContext, useState, useContext, useEffect } from "react";
import { User, AuthContextProps } from "../types/types";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isStaff, setIsStaff] = useState<boolean>(() => {
    const storedIsStaff = localStorage.getItem("isStaff");
    return storedIsStaff ? JSON.parse(storedIsStaff) : false;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("isStaff", JSON.stringify(isStaff));
  }, [isStaff]);

  return (
    <AuthContext.Provider value={{ user, isStaff, setUser, setIsStaff }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
