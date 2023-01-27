import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { PokemonsGrid } from "./types";

const initialState: PokemonsGrid = {
  page: 0,
  pageSize: 25,
};

export const pokemonsGridSlice = createSlice({
  name: "pokemonsTable",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => ({
      ...state,
      page: action.payload,
    }),
    setPageSize: (state, action: PayloadAction<number>) => ({
      ...state,
      pageSize: action.payload,
    }),
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.system,
      };
    },
  },
});

export const { setPage, setPageSize } = pokemonsGridSlice.actions;
