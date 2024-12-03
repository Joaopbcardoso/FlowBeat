import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useAlbumContext } from "../../scripts/albunsContext.js";
import RBSheet from "react-native-raw-bottom-sheet"; 
import { Audio } from "expo-av"; 

const AlbumPage = () => {
  const { selectedAlbumId } = useAlbumContext();
  const [album, setAlbum] = useState(null);
  const [musicas, setMusicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(null);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (selectedAlbumId) {
      setLoading(true);

      fetch(`http://192.168.0.12:8000/album/${selectedAlbumId}`)
        .then((response) => response.json())
        .then((data) => {
          setAlbum(data);
        })
        .catch((error) => console.error("Erro ao buscar dados do álbum", error));

      fetch(`http://192.168.0.12:8000/album/${selectedAlbumId}/musicas`)
        .then((response) => response.json())
        .then((data) => {
          setMusicas(data);
        })
        .catch((error) => console.error("Erro ao buscar as músicas", error))
        .finally(() => setLoading(false));
    }
  }, [selectedAlbumId]);

  const playMusic = async (musica) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: musica.fileUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setCurrentMusic(musica);
      bottomSheetRef.current.open();
    } catch (error) {
      console.error("Erro ao tentar tocar a música", error);
    }
  };

  const pauseMusic = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeMusic = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const closePlayer = () => {
    bottomSheetRef.current.close(); 
    stopMusic(); 
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!album) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Álbum não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: album.coverImageUrl }} style={styles.image} />
      <Text style={styles.title}>{album.title}</Text>
      <Text style={styles.releaseYear}>{album.releaseYear}</Text>

      <Text style={styles.sectionTitle}>Músicas</Text>
      <FlatList
        data={musicas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.musicCard}>
            <Text style={styles.musicTitle}>{item.titulo}</Text>
            <Text style={styles.musicDuration}>{item.duracao} segundos</Text>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => playMusic(item)}
            >
              <Image
                source={require("../../assets/images/play.png")}
                style={styles.playImage}
              />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.musicList}
      />
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={200}
        customStyles={{
          container: {
            backgroundColor: "#2E2E2E",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <View style={styles.playerContainer}>
          <Text style={styles.musicTitle}>Agora Tocando: {currentMusic ? currentMusic.titulo : ''}</Text>
          <View style={styles.playerControls}>
            <TouchableOpacity onPress={isPlaying ? pauseMusic : resumeMusic}> 
              <Text style={styles.controlButton}>{isPlaying ? "Pausar" : "Tocar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closePlayer}>
              <Text style={styles.controlButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
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
    borderColor: "#FFD700",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  releaseYear: {
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
  musicList: {
    paddingVertical: 10,
  },
  musicCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#3C3C3C",
  },
  musicTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
    textAlign: "left",
  },
  musicDuration: {
    fontSize: 14,
    color: "#B0B0B0",
    textAlign: "center",
    marginHorizontal: 10,
  },
  playButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  playImage: {
    width: 25,
    height: 25,
  },
  playerContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  playerControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  controlButton: {
    color: "#FFD700",
    fontSize: 16,
  },
});

export default AlbumPage;
