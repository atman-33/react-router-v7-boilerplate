import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import { SidebarProvider } from '~/components/shadcn/ui/sidebar';
import { PokemonsSidebar } from './pokemons-sidebar';

const meta: Meta<typeof PokemonsSidebar> = {
  title: 'Components/PokemonSidebar',
  component: PokemonsSidebar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <SidebarProvider>
          <Story />
        </SidebarProvider>
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PokemonsSidebar>;

export const Default: Story = {
  args: {
    pokemons: [
      {
        id: 1,
        name: 'Bulbasaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      },
      {
        id: 2,
        name: 'Ivysaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      },
      {
        id: 3,
        name: 'Venusaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      },
    ],
  },
};
