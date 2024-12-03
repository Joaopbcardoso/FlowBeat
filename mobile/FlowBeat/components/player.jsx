import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const Player = ({ audioUrl, onClose }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUrl]);

  const loadAudio = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reproduzindo: {audioUrl}</Text>
      <Button title={isPlaying ? "Pausar" : "Tocar"} onPress={togglePlayback} />
      <Button title="Fechar" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginBottom: 10,
  },
});

export default Player;
