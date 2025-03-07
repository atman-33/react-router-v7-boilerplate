import { builder } from '../../builder';

export const definePlanetStarClusterType = () => {
  builder.prismaNode('PlanetStarCluster', {
    id: { field: 'planetId_starClusterId' },
    fields: (t) => ({
      planet: t.relation('planet'),
      starCluster: t.relation('starCluster'),
    }),
  });
};
