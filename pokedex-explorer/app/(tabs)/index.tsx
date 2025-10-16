import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { fetchPokemonPage, fetchPokemonByName } from "../api/pokeApi";
import PokemonCard from "../../components/PokemonCard"; 
import { useRouter } from "expo-router";

export default function PokedexScreen() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadPokemons = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPokemonPage(offset);
      setPokemons((prev) => [...prev, ...data.results]);
    } catch {
      setError("Erro ao carregar os Pokémon.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const data = await fetchPokemonByName(search.trim());
      router.push({ pathname: "../details", params: { name: data.name } });
    } catch {
      setError("Pokémon não encontrado.");
    }
  };

  useEffect(() => {
    loadPokemons();
  }, [offset]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex Explorer</Text>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Buscar Pokémon..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading && pokemons.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          numColumns={2}
          renderItem={({ item }) => {
            const id = item.url.split("/").filter(Boolean).pop();
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            return (
              <PokemonCard
                name={item.name}
                imageUrl={imageUrl}
                onPress={() => router.push({ pathname: "../details", params: { name: item.name } })}
              />
            );
          }}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator />
            ) : (
              <Button title="Carregar Mais" onPress={() => setOffset(offset + 20)} />
            )
          }
        />
      )}

      <View style={{ marginTop: 10 }}>
        <Button title="Favoritos" onPress={() => router.push("../favorites")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  searchRow: { flexDirection: "row", marginBottom: 10, gap: 5 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
});
