import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // Aquí iría la lógica de autenticación real
    // Por ahora, simularemos un login exitoso
    const fakeUser = { id: 1, username, role: 'admin' };
    setUser(fakeUser);
    return fakeUser;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};