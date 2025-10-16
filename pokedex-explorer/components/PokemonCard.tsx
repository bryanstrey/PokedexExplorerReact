import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  name: string;
  imageUrl: string;
  onPress: () => void;
};

export default function PokemonCard({ name, imageUrl, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    margin: 5,
  },
  image: { width: 80, height: 80 },
  name: { marginTop: 5, fontWeight: "bold", textTransform: "capitalize" },
});
