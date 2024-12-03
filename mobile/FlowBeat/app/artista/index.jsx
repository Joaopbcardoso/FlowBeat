import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList } from "react-native";
import { useArtistContext } from "../../scripts/artistContext.js";

const ArtistaPage = () => {
  const { selectedArtistId } = useArtistContext();
  const [artista, setArtista] = useState(null);
  const [albuns, setAlbuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedArtistId) {
      // Fetch informações do artista
      fetch(`http://192.168.0.12:8000/artista/${selectedArtistId}`)
        .then((response) => response.json())
        .then((data) => {
          setArtista(data);
        })
        .catch((error) => console.error("Erro ao buscar os dados do artista", error));

      // Fetch álbuns do artista
      fetch(`http://192.168.0.12:8000/artista/${selectedArtistId}/albuns`)
        .then((response) => response.json())
        .then((data) => {
          setAlbuns(data);
        })
        .catch((error) => console.error("Erro ao buscar os álbuns do artista", error))
        .finally(() => setLoading(false));
    }
  }, [selectedArtistId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!artista) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Artista não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: artista.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{artista.nome}</Text>
      <Text style={styles.bio}>{artista.bio}</Text>

      <Text style={styles.sectionTitle}>Álbuns</Text>
      <FlatList
        data={albuns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.albumCard}>
            <Image source={{ uri: item.coverImageUrl }} style={styles.albumImage} />
            <Text style={styles.albumTitle}>{item.tltle}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.albumList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2E2E2E",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E2E2E",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#00ff43",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: "#B0B0B0",
    textAlign: "center",
    lineHeight: 22,
  },
  errorText: {
    fontSize: 18,
    color: "#FFD700",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 20,
  },
  albumList: {
    paddingVertical: 10,
  },
  albumCard: {
    marginRight: 15,
    alignItems: "center",
  },
  albumImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    maxWidth: 120,
  },
});

export default ArtistaPage;
