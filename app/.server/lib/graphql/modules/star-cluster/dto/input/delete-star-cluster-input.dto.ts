import { builder } from '~/.server/lib/graphql/builder';

export const DeleteStarClusterInput = builder.inputType(
  'DeleteStarClusterInput',
  {
    fields: (t) => ({
      id: t.string({ required: true }),
    }),
  },
);
