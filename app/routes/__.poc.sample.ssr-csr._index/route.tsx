import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Input } from '~/components/shadcn/ui/input';
import type { NamedAPIResource } from '../__.poc.sample/types/pokemon';
import type { Route } from './+types/route';

const fetchPokes = async (keyword?: string) => {
  // PokeAPI から全ポケモンリストを取得
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
  const data = await response.json();
  const allPokemon: NamedAPIResource[] = data.results;

  if (!keyword) {
    return { pokemons: allPokemon };
  }

  // keywordが指定されている場合は、一致するポケモンをフィルタリング
  console.log('Filtering by keyword:', keyword);
  const filtered = allPokemon.filter((p) => p.name.includes(keyword));
  return { pokemons: filtered };
};

export const loader = async () => {
  console.log('loader for SSR!');
  const { pokemons } = await fetchPokes();
  return { pokemons, type: 'ssr' };
};

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  console.log('clientAction for CSR!');
  const formData = await request.formData();
  // NOTE: Object.fromEntriesで、type submitのvalueを取得する
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'search': {
      const keyword = formData.get('keyword') as string;
      const { pokemons } = await fetchPokes(keyword);
      return { pokemons, type: 'csr', action: 'search' };
    }

    case 'reset': {
      const { pokemons } = await fetchPokes();
      return { pokemons, type: 'csr', action: 'reset' };
    }
  }
};

const PocSampleSsrCsrPage = ({
  loaderData,
  actionData,
}: Route.ComponentProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  // NOTE: actionDataだと、loading中か判断できないため、useFetcherを使う
  const fetcher = useFetcher<typeof actionData>();
  const pokemons = fetcher.data?.pokemons || loaderData.pokemons;
  const type = fetcher.data?.type || loaderData.type;
  console.log('type:', type);

  useEffect(() => {
    if (fetcher.data?.action === 'reset') {
      formRef.current?.reset();
    }
  }, [fetcher]);

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <h1 className="font-bold text-xl">Sample SSR CSR Page</h1>
      <h2 className="text-lg">Pokemon List</h2>
      <fetcher.Form
        action="/poc/sample/ssr-csr"
        method="post"
        className="flex flex-col gap-4"
        ref={formRef}
      >
        <Input type="text" name="keyword" placeholder="Search Pokemon" />
        <div className="flex gap-4">
          <Button type="submit" name="_action" value="search">
            Search
          </Button>
          <Button type="submit" name="_action" value="reset">
            Reset
          </Button>
        </div>
      </fetcher.Form>
      {fetcher.state !== 'idle' ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.name}>
              <div className="grid grid-cols-2 gap-4">
                <div>{pokemon.name}</div>
                <div>{pokemon.url}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PocSampleSsrCsrPage;
