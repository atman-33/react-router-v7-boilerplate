import { Outlet } from 'react-router';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/shadcn/ui/sidebar';
import type { PokemonResourceList } from '../__.poc/types/pokemon';
import type { Route } from './+types/route';
import RemixTutorialSidebar from './components/remix-tutorial-sidebar';

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

export const loader = async () => {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100',
  );
  const data = (await res.json()) as PokemonResourceList;

  const pokemons = data.results.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));

  return { pokemons };
};

const RemixTutorialLayout = ({ loaderData }: Route.ComponentProps) => {
  const { pokemons } = loaderData;
  return (
    <>
      <SidebarProvider>
        <RemixTutorialSidebar pokemons={pokemons} />
        <SidebarInset>
          <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default RemixTutorialLayout;
