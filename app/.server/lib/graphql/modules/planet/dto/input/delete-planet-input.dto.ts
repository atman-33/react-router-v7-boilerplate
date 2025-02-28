import { builder } from '~/.server/lib/graphql/builder';

export const DeletePlanetInput = builder.inputType('DeletePlanetInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});
