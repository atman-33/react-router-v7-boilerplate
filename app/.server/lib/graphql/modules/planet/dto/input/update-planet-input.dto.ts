import { builder } from '~/.server/lib/graphql/builder';

export const UpdatePlanetInput = builder.inputType('UpdatePlanetInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    name: t.string({ required: true }),
    starClusterIds: t.stringList({ required: false }),
  }),
});
