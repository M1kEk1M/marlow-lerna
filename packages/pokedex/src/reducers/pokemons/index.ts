import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { HYDRATE } from "next-redux-wrapper";

import {
  PokemonLink,
  PokemonListApiResponse,
  PokemonListApiRequest,
  Pokemon,
} from "./types";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `/pokemon/${name}`,
    }),
    getPokemons: builder.query<PokemonListApiResponse, PokemonListApiRequest>({
      query: (params) =>
        `/pokemon?offset=${params.offset}&limit=${params.limit}`,
    }),
  }),
});
export const { useGetPokemonByNameQuery, useGetPokemonsQuery } = pokemonApi;
