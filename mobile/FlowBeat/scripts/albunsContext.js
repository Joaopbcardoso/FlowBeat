import React, { createContext, useContext, useState } from "react";

const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  return (
    <AlbumContext.Provider value={{ selectedAlbumId, setSelectedAlbumId }}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbumContext = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbumContext must be used within an AlbumProvider");
  }
  return context;
};
