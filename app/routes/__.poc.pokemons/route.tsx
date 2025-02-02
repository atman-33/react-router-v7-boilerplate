import { Link, Outlet } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/shadcn/ui/breadcrumb';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/shadcn/ui/sidebar';
import type { PokemonResourceList } from '../__.poc._index/types/pokemon';
import type { Route } from './+types/route';
import { PokemonsSidebar } from './components/pokemons-sidebar';

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

export const loader = async () => {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151',
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

const PokemonsLayout = ({ loaderData }: Route.ComponentProps) => {
  const { pokemons } = loaderData;
  return (
    <>
      <SidebarProvider>
        <PokemonsSidebar pokemons={pokemons} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link to="/">
                    <BreadcrumbLink>Home</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link to="/poc">
                    <BreadcrumbLink>PoC</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Pokemon App</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default PokemonsLayout;
