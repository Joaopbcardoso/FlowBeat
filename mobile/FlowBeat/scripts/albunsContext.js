import React, { createContext, useContext, useState } from "react";

// Criação do contexto de Álbum
const AlbumContext = createContext();

// Provedor de contexto
export const AlbumProvider = ({ children }) => {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  return (
    <AlbumContext.Provider value={{ selectedAlbumId, setSelectedAlbumId }}>
      {children}
    </AlbumContext.Provider>
  );
};

// Hook para acessar o contexto de álbum
export const useAlbumContext = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbumContext must be used within an AlbumProvider");
  }
  return context;
};
