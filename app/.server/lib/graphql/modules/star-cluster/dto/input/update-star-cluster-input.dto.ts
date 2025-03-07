import { builder } from '~/.server/lib/graphql/builder';

export const UpdateStarClusterInput = builder.inputType(
  'UpdateStarClusterInput',
  {
    fields: (t) => ({
      id: t.string({ required: true }),
      name: t.string({ required: true }),
    }),
  },
);
