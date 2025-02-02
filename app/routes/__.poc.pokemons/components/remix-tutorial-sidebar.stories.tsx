import type { Meta, StoryObj } from '@storybook/react';
import { SidebarProvider } from '~/components/shadcn/ui/sidebar';
import RemixTutorialSidebar from './remix-tutorial-sidebar';

const meta: Meta<typeof RemixTutorialSidebar> = {
  title: 'Components/RemixTutorialSidebar',
  component: RemixTutorialSidebar,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RemixTutorialSidebar>;

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
