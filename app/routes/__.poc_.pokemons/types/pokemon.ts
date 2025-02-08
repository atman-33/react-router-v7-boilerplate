export interface PokemonResourceList {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonSummary {
  id: number;
  name: string;
  image: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprite;
}

interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

interface PokemonSprite {
  /** 通常ポケモンの正面画像 */
  front_default: string | null;
  /** 色違いポケモンの正面画像 */
  front_shiny: string | null;
  /** 通常ポケモンの背面画像 */
  back_default: string | null;
  /** 色違いポケモンの背面画像 */
  back_shiny: string | null;
}
