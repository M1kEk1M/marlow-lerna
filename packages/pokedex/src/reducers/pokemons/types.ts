export type PokemonLink = {
  name: string;
  url: string;
};

export type PokemonList = PokemonLink[];

export type PokemonListApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonList;
};

export type PokemonListApiRequest = {
  limit: number;
  offset: number;
};

export type Pokemon = {
  name: string;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  sprites: {
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_femaly?: string;
  };
};
