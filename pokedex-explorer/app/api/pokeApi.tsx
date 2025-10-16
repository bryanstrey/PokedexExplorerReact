import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

export type PokemonListResult = {
  name: string;
  url: string;
};

export async function fetchPokemonPage(offset = 0, limit = 20) {
  const res = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);
  return res.data;
}

export async function fetchPokemonByName(name: string) {
  const res = await api.get(`/pokemon/${name.toLowerCase()}`);
  return res.data;
}
