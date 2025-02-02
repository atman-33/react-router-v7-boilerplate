import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import { SidebarProvider } from '~/components/shadcn/ui/sidebar';
import { PokemonSidebar } from './pokemon-sidebar';

const meta: Meta<typeof PokemonSidebar> = {
  title: 'Components/PokemonSidebar',
  component: PokemonSidebar,
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

type Story = StoryObj<typeof PokemonSidebar>;

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
