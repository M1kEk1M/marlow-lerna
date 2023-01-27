import { Card, CardContent, Typography } from "@mui/material";
import { isString, capitalize } from "@pokedex/utils";
import { Sprites } from "@pokedex/components";
import { useRouter } from "next/router";

import { useGetPokemonByNameQuery, pokemonApi } from "@/reducers/pokemons";
import { wrapper } from "@/store";
import { extractSprites } from "@/reducers/pokemons/utils";

export default function PokemonPage() {
  const { query } = useRouter();

  const { data, isLoading } = useGetPokemonByNameQuery(
    isString(query.pokemon) ? query.pokemon : ""
  );

  return (
    <div>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <Card style={{ width: 250, margin: "auto" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Your Pokemon
            </Typography>
            <Typography variant="h5" component="div">
              {capitalize(data.name || "")}
            </Typography>

            {data.stats.map((item) => (
              <Typography key={item.stat.name} variant="body2">
                {item.stat.name}: {item.base_stat}
              </Typography>
            ))}
            <Sprites imagePaths={extractSprites(data.sprites)}></Sprites>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const pokemon = context.params?.pokemon;
      if (typeof pokemon !== "string") {
        return {
          notFound: true,
        };
      }

      store.dispatch(pokemonApi.endpoints.getPokemonByName.initiate(pokemon));
      const result = await Promise.all(
        store.dispatch(pokemonApi.util.getRunningQueriesThunk())
      );

      if (result[0].status === "rejected") {
        return {
          notFound: true,
        };
      }

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
