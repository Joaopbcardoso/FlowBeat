import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const PlayerPage = () => {
  const router = useRouter();
  const { musica } = router.query; 
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (musica) {
      const parsedMusica = JSON.parse(decodeURIComponent(musica)); 

      const loadAudio = async () => {
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: parsedMusica.fileUrl }
          );
          setSound(sound);
          setLoading(false);
        } catch (error) {
          console.error("Erro ao processar a música:", error);
          setLoading(false);
        }
      };

      loadAudio();

      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    } else {
      setLoading(false); 
    }
  }, [musica]);

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!musica) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Música não encontrada</Text>
      </View>
    );
  }

  const parsedMusica = JSON.parse(decodeURIComponent(musica)); 

  return (
    <View style={styles.container}>
      <Text style={styles.musicTitle}>{parsedMusica.titulo}</Text>
      <Text style={styles.musicDuration}>{parsedMusica.duracao} segundos</Text>
      <View style={styles.playerContainer}>
        <TouchableOpacity onPress={handlePlayPause}>
          <Text style={styles.playButton}>{isPlaying ? "Pause" : "Play"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E2E2E",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E2E2E",
  },
  musicTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  musicDuration: {
    fontSize: 18,
    color: "#B0B0B0",
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "#FFD700",
    textAlign: "center",
  },
  playerContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  playButton: {
    fontSize: 20,
    color: "#FFFFFF",
    backgroundColor: "#1DB954",
    padding: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default PlayerPage;
