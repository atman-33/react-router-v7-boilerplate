import { builder } from '~/.server/lib/graphql/builder';

export const CreatePlanetInput = builder.inputType('CreatePlanetInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    starClusterIds: t.stringList({ required: false }),
  }),
});
