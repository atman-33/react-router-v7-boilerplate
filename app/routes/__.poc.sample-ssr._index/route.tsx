import { Link } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import type { PokemonResourceList } from '../__.poc/types/pokemon';
import type { Route } from './+types/route';

// loaderは、サーバーサイドでのみ実行される
export const loader = async ({ request }: Route.LoaderArgs) => {
  console.log('loader for SSR!');

  // NOTE: URLSearchParamsを使ってクエリパラメータを取得
  const url = new URL(request.url);
  const offset = url.searchParams.get('offset') || '0';
  const limit = url.searchParams.get('limit') || '20';

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );
  const data = (await res.json()) as PokemonResourceList;

  return { data, offset, limit };
};

const PocSampleSsrPage = ({ loaderData }: Route.ComponentProps) => {
  const { data, offset, limit } = loaderData;
  const nextOffset = Number.parseInt(offset) + Number.parseInt(limit);
  const prevOffset = Number.parseInt(offset) - Number.parseInt(limit);

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <h1 className="font-bold text-xl">Sample SSR Page</h1>
      <h2 className="text-lg">Pokemon List</h2>
      <ul>
        {data.results.map((pokemon) => (
          <li key={pokemon.name}>
            <div className="grid grid-cols-2 gap-4">
              <div>{pokemon.name}</div>
              <div>{pokemon.url}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        {/* NOTE: Linkにdisabledプロパティがないため、pointer-events-noneで代用 */}
        <div className={data.previous ? '' : 'pointer-events-none'}>
          <Link to={`?offset=${prevOffset}&limit=${limit}`}>
            <Button className="w-24" disabled={!data.previous}>
              Previous
            </Button>
          </Link>
        </div>
        <div className={data.next ? '' : 'pointer-events-none'}>
          <Link to={`?offset=${nextOffset}&limit=${limit}`}>
            <Button className="w-24" disabled={!data.next}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PocSampleSsrPage;
