import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState(null);
  const [profileImage, setProfileImage] = useState('https://www.jet.ir/uploadFiles/avatar/noprofile.png'); 
  const updateUser = (userData) => {
    setDataUser(userData);
  };
  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  return (
    <AppContext.Provider value={{ dataUser, updateUser, profileImage, updateProfileImage }}>
      {children}
    </AppContext.Provider>
  );
};
