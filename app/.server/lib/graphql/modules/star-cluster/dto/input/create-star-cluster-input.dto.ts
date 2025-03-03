import { builder } from '~/.server/lib/graphql/builder';

export const CreateStarClusterInput = builder.inputType(
  'CreateStarClusterInput',
  {
    fields: (t) => ({
      name: t.string({ required: true }),
    }),
  },
);
