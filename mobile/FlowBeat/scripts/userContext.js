import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState(null);

  const updateUser = (userData) => {
    setDataUser(userData);
  };

  return (
    <AppContext.Provider value={{ dataUser, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};