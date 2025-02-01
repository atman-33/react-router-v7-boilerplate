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
import type { PokemonSummary } from '~/routes/__.poc/types/pokemon';

interface RemixTutorialSidebarProps {
  pokemons: PokemonSummary[];
}

const RemixTutorialSidebar = ({ pokemons }: RemixTutorialSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader className="h-[72px] border-b">
        <Link to="/poc/remix-tutorial">
          <div className="flex items-center gap-2 pt-2">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              alt="Pikachu"
              className="w-12"
            />
            <span className="font-bold">Pokemon</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="pl-2">
        <SidebarGroup />
        <SidebarGroupLabel>Total {pokemons.length}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {pokemons.map((pokemon) => (
              <SidebarMenuItem key={pokemon.id}>
                <Link to={`/poc/remix-tutorial/pokemons/${pokemon.id}`}>
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
      </SidebarContent>
      <SidebarFooter className="border-t py-4 font-bold">
        React Router x shadcn/ui
      </SidebarFooter>
    </Sidebar>
  );
};

export default RemixTutorialSidebar;
