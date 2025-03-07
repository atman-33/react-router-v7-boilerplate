import { builder } from '~/.server/lib/graphql/builder';

export const GetPlanetArgs = builder.inputType('GetPlanetArgs', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});
