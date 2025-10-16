import { Stack } from "expo-router";
import { FavoritesProvider } from "../context/FavoritesContext"; // Adjust the path as necessary

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Pokédex" }} />
        <Stack.Screen name="details" options={{ title: "Detalhes" }} />
        <Stack.Screen name="favorites" options={{ title: "Favoritos" }} />
      </Stack>
    </FavoritesProvider>
  );
}
