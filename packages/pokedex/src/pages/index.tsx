import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { gridToApi } from "@pokedex/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useGetPokemonsQuery, pokemonApi } from "@/reducers/pokemons";
import { setPage, setPageSize } from "@/reducers/pokemonsGrid";

import { AppDispatch, AppState, wrapper } from "../store";
import { useCallback } from "react";

const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 200 },
];
export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const goToPokemon = useCallback(
    (val: GridRowParams) => {
      router.push(`/pokemon/${val.id}`);
    },
    [router]
  );
  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );
  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      dispatch(setPageSize(pageSize));
    },
    [dispatch]
  );

  const gridState = useSelector((state: AppState) => state.pokemonsGrid);
  const { data, isLoading } = useGetPokemonsQuery(gridToApi(gridState));

  const rows =
    data &&
    data.results.map((item) => ({
      id: item.name,
      col1: item.name,
    }));

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ width: "100%", height: 450 }}>
        <h1>Pokemons</h1>
        <DataGrid
          onRowClick={goToPokemon}
          onPageChange={handleSetPage}
          page={gridState.page}
          paginationMode="server"
          pageSize={gridState.pageSize}
          onPageSizeChange={handleChangePageSize}
          rowCount={data?.count || 20}
          loading={isLoading}
          rows={rows || []}
          columns={columns}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const data = store.getState().pokemonsGrid;
      store.dispatch(
        pokemonApi.endpoints.getPokemons.initiate(gridToApi(data))
      );

      await Promise.all(
        store.dispatch(pokemonApi.util.getRunningQueriesThunk())
      );
      return {
        props: {},
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
);
