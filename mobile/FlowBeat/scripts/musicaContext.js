import React, { createContext, useState, useContext } from 'react';

// Cria o contexto da música
const MusicaContext = createContext();

// Provedor do contexto
export const MusicaProvider = ({ children }) => {
  const [musicaSelecionada, setMusicaSelecionada] = useState(null);

  return (
    <MusicaContext.Provider value={{ musicaSelecionada, setMusicaSelecionada }}>
      {children}
    </MusicaContext.Provider>
  );
};

// Hook para consumir o contexto
export const useMusicaContext = () => {
  return useContext(MusicaContext);
};
