import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useArtistContext } from "../scripts/artistContext.js";
import { useRouter } from "expo-router";

const ArtistaCard = ({ id, nome, imageUrl }) => {
  const { setSelectedArtistId } = useArtistContext(); // Para o artista
  const router = useRouter();

  const handlePress = () => {
    setSelectedArtistId(id); 
    router.push(`/artista`);  
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.nome}>{nome}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default ArtistaCard;
