import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ArtistaCard from '../../components/ArtistaCard.jsx';
import AlbumCard from '../../components/AlbumCard.jsx';

export default function Home() {
  const [artistas, setArtistas] = useState([]);
  const [albuns, setAlbuns] = useState([]);

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const response = await fetch('http://192.168.0.12:8000/artista/'); // Replace with your actual artist endpoint
        if (!response.ok) {
          throw new Error(response.statusText || 'Erro ao buscar artistas');
        }
        const data = await response.json();
        setArtistas(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        alert('Erro ao buscar artistas. Tente novamente mais tarde.');
      }
    };

    fetchArtistas();
  }, []);

  useEffect(() => {
    const fetchAlbuns = async () => {
      try {
        const response = await fetch('http://192.168.0.12:8000/album/'); // Replace with your actual album endpoint
        if (!response.ok) {
          throw new Error(response.statusText || 'Erro ao buscar álbuns');
        }
        const data = await response.json();
        setAlbuns(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
        alert('Erro ao buscar álbuns. Tente novamente mais tarde.');
      }
    };

    fetchAlbuns();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Artistas</Text>
      <FlatList
        data={artistas}
        renderItem={({ item }) => (
          <TouchableOpacity> {/* Added TouchableOpacity for potential click handling */}
            <ArtistaCard id={item.id} nome={item.nome} imageUrl={item.imageUrl} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Similar FlatList for albums */}
      <Text style={styles.title}>Álbuns</Text>
      <FlatList
        data={albuns}
        renderItem={({ item }) => (
          <TouchableOpacity> {/* Added TouchableOpacity for potential click handling */}
            <AlbumCard id={item.id} title={item.title} coverImageUrl={item.coverImageUrl} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});