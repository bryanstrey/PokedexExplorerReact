import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchPokemonByName } from "./api/pokeApi";
import { useFavorites } from "./context/FavoritesContext";

export default function DetailsScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchPokemonByName(name);
        setPokemon(data);
      } catch {
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [name]);

  if (loading) return <ActivityIndicator size="large" />;

  if (!pokemon)
    return <Text style={styles.error}>Erro ao carregar detalhes do Pokémon.</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text>Número: {pokemon.id}</Text>
      <Text>Tipo: {pokemon.types.map((t: any) => t.type.name).join(", ")}</Text>
      <Text>Habilidades: {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}</Text>

      <Button
        title={isFavorite(pokemon.name) ? "Remover dos Favoritos" : "Favoritar"}
        onPress={() => toggleFavorite(pokemon.name)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  image: { width: 150, height: 150 },
  name: { fontSize: 24, fontWeight: "bold", textTransform: "capitalize", marginBottom: 10 },
  error: { color: "red", textAlign: "center" },
});
