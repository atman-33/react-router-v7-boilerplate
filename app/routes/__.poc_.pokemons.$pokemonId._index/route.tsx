import { useEffect } from 'react';
import { useFetcher, useParams } from 'react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/shadcn/ui/card';
import { LoadingDots } from '~/components/shared/loading-dots';
import type { Pokemon } from '../__.poc_.pokemons/types/pokemon';
import type { Route } from './+types/route';

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const { pokemonId } = params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const pokemon = (await res.json()) as Pokemon;
  return { pokemon };
};

export const HydrateFallback = () => {
  return <LoadingDots />;
};

const PokemonPage = ({ loaderData }: Route.ComponentProps) => {
  const fetcher = useFetcher<typeof loaderData>();
  const pokemon = fetcher.data?.pokemon;
  const { pokemonId } = useParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetcher.load(`/poc/pokemons/${pokemonId}`);
  }, [pokemonId]);

  return (
    <div className="container mx-auto p-4">
      {fetcher.state !== 'idle' ? <LoadingDots /> : null}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">
            <h2>{pokemon?.name}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <img src={pokemon?.sprites.front_default ?? ''} alt={pokemon?.name} />
          <CardDescription className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mt-4 font-bold text-xl">Base</h3>
              <ul>
                <li>Height: {pokemon?.height}</li>
                <li>Weight: {pokemon?.weight}</li>
              </ul>
            </div>

            <div>
              <h3 className="mt-4 font-bold text-xl">Status</h3>
              <ul>
                {pokemon?.abilities.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mt-4 font-bold text-xl">Types</h3>
              <ul>
                {pokemon?.types.map((type) => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mt-4 font-bold text-2xl">Stats</h3>
              <ul>
                {pokemon?.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonPage;
