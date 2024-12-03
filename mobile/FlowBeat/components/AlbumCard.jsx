import React, { useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAlbumContext } from '../scripts/albunsContext.js';

const MAX_TEXT_LENGTH = 15;
const OFFSET = 150;

const AlbumCard = ({ id, title, coverImageUrl }) => {
const { setSelectedAlbumId } = useAlbumContext();
  const animatedValue = useRef(new Animated.Value(OFFSET)).current;
  const router = useRouter();

  useEffect(() => {
    if (title.length > MAX_TEXT_LENGTH) {
      const textWidth = title.length * 10;
      const fullWidth = textWidth + 150 + OFFSET;

      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: -textWidth,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: fullWidth,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      animation.start();
      return () => animation.stop();
    }
  }, [animatedValue, title]);

  const handlePress = () => {
    setSelectedAlbumId(id); 
    router.push(`/album`);  
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Image source={{ uri: coverImageUrl }} style={styles.image} />
        {title.length <= MAX_TEXT_LENGTH ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <View style={[styles.textContainer, { width: 150 }]}>
            <Animated.Text
              style={[styles.title, { transform: [{ translateX: animatedValue }], width: title.length * 10 }]}
            >
              {title}
            </Animated.Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 20,
    alignItems: 'center',
    backgroundColor: '#2E2E2E', // Adiciona a cor de fundo para o card
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    overflow: 'hidden',
    height: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default AlbumCard;
