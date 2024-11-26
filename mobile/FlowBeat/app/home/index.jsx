import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function Home() {
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    // Função para pegar todos os artistas com try...catch
    const fetchArtistas = async () => {
      try {
        const response = await fetch("http://localhost:8000/artista/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
          }
        });

        const catchMessage = await response.json();
        console.log(catchMessage);

        if (response.ok) {
          setArtistas(catchMessage); // Atualiza o estado com os artistas
        } else {
          alert(catchMessage.message || 'Erro ao buscar artistas');
        }

      } catch (error) {
        console.log(error);
        alert('Erro ao conectar ao servidor');
      }
    };

    fetchArtistas();
  }, []);

  // Função para renderizar cada item da lista de artistas
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.nome}>{item.nome}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={artistas}
        renderItem={renderItem}
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
  card: {
    marginRight: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  nome: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
