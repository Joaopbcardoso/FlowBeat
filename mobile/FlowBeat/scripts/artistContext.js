import React, { createContext, useState, useContext } from 'react';

const ArtistContext = createContext();

export const ArtistProvider = ({ children }) => {
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  return (
    <ArtistContext.Provider
      value={{
        selectedArtistId,
        setSelectedArtistId,
        selectedAlbumId,
        setSelectedAlbumId,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtistContext = () => useContext(ArtistContext);
