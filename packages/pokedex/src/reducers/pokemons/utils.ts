import { isString } from "@pokedex/utils";
import { Pokemon } from "./types";

export const extractSprites = (sprites: Pokemon["sprites"]) => {
  return [
    sprites.back_default,
    sprites.back_female,
    sprites.back_shiny,
    sprites.back_shiny_femaly,
    sprites.front_default,
    sprites.front_female,
    sprites.front_shiny,
    sprites.front_default,
  ].filter(isString);
};
