import React from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useFavorites } from "./context/FavoritesContext";
import PokemonCard from "../components/PokemonCard";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon Favoritos</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Nenhum Pokémon favoritado.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          numColumns={2}
          renderItem={({ item }) => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${favorites.indexOf(item) + 1}.png`;
            return (
              <PokemonCard
                name={item}
                imageUrl={imageUrl}
                onPress={() => router.push({ pathname: "../details", params: { name: item } })}
              />
            );
          }}
        />
      )}
      <Button title="Voltar à Pokédex" onPress={() => router.push("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  empty: { textAlign: "center", color: "#666", marginTop: 20 },
});
