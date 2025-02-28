import { builder } from '../../builder';

export const definePlanetType = () => {
  builder.prismaNode('Planet', {
    id: { field: 'id' },
    findUnique: (id) => ({ id }),
    fields: (t) => ({
      name: t.exposeString('name'),
      clusters: t.relation('clusters'),
    }),
  });
};
