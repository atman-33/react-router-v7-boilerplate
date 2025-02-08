import { Link } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '~/components/shadcn/ui/sidebar';
import type { PokemonSummary } from '~/routes/__.poc._index/types/pokemon';

interface PokemonsSidebarProps {
  pokemons: PokemonSummary[];
}

const PokemonsSidebar = ({ pokemons }: PokemonsSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link to="/poc/pokemons">
          <div className="flex items-center gap-2">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              alt="Pikachu"
              className="h-12"
            />
            <span className="font-bold">Pokemon App</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Total {pokemons.length}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pokemons.map((pokemon) => (
                <SidebarMenuItem key={pokemon.id}>
                  <Link to={`/poc/pokemons/${pokemon.id}`}>
                    <div className="flex items-center gap-2">
                      <img
                        src={pokemon.image}
                        alt="404"
                        aria-label={pokemon.name}
                        className="w-8"
                      />
                      <span>{pokemon.name}</span>
                    </div>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t py-4 font-bold">
        React Router x shadcn/ui
      </SidebarFooter>
    </Sidebar>
  );
};

export { PokemonsSidebar };
