import React, { createContext, useState, useContext } from "react";

import { User, AuthContextProps } from "../types/types";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isStaff, setIsStaff] = useState<boolean>(false);

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
