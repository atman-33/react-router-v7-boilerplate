import { builder } from '~/.server/lib/graphql/builder';

export const GetStarClusterArgs = builder.inputType('GetStarClusterArgs', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});
