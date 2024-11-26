import React, { createContext, useState } from 'react';

// Criação do contexto
export const AppContext = createContext();

// Provedor do contexto
export const AppProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState(null);
  const [profileImage, setProfileImage] = useState('https://www.jet.ir/uploadFiles/avatar/noprofile.png'); // Estado para foto de perfil

  // Função para atualizar as informações do usuário
  const updateUser = (userData) => {
    setDataUser(userData);
  };

  // Função para atualizar a foto de perfil
  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  return (
    <AppContext.Provider value={{ dataUser, updateUser, profileImage, updateProfileImage }}>
      {children}
    </AppContext.Provider>
  );
};
