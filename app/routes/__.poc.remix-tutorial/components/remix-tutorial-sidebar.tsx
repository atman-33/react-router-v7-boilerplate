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
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
            className="w-16"
          />
          <span>Pokemon</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="pl-2">
        <SidebarGroup />
        <SidebarGroupLabel>List</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {pokemons.map((pokemon) => (
              <SidebarMenuItem key={pokemon.id}>
                <div className="flex items-center gap-2">
                  <img src={pokemon.image} alt={pokemon.name} className="w-8" />
                  <span>{pokemon.name}</span>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default RemixTutorialSidebar;
