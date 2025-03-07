import { builder } from '../../builder';

export const defineStarClusterType = () => {
  builder.prismaNode('StarCluster', {
    id: { field: 'id' },
    findUnique: (id) => ({ id }),
    fields: (t) => ({
      name: t.exposeString('name'),
      planets: t.relation('planets'),
    }),
  });
};
