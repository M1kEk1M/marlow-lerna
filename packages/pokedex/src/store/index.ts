import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { pokemonApi } from "@/reducers/pokemons";
import { pokemonsGridSlice } from "@/reducers/pokemonsGrid";

export const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      pokemonsGrid: pokemonsGridSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });

type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
