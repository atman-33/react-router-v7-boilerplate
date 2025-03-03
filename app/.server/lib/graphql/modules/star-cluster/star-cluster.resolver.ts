import { decodeGlobalID } from '@pothos/plugin-relay';
import { prisma } from '~/.server/lib/prisma-client';
import { builder } from '../../builder';
import { GetStarClusterArgs } from './dto/args/get-star-cluster-args.dto';
import { CreateStarClusterInput } from './dto/input/create-star-cluster-input.dto';
import { DeleteStarClusterInput } from './dto/input/delete-star-cluster-input.dto';
import { UpdateStarClusterInput } from './dto/input/update-star-cluster-input.dto';

export const defineStarClusterResolver = () => {
  // --- Query
  builder.queryField('starClusters', (t) =>
    t.prismaConnection({
      type: 'StarCluster',
      cursor: 'id',
      resolve: (query) => prisma.starCluster.findMany({ ...query }),
      totalCount: () => prisma.starCluster.count(),
    }),
  );

  builder.queryField('starCluster', (t) =>
    t.prismaField({
      type: 'StarCluster',
      args: { args: t.arg({ type: GetStarClusterArgs, required: true }) },
      resolve: async (query, _parent, { args }) => {
        const { id: rawId } = decodeGlobalID(args.id);
        return await prisma.starCluster.findUnique({
          ...query,
          where: { id: rawId },
        });
      },
    }),
  );

  // --- Mutation
  builder.mutationField('createStarCluster', (t) =>
    t.prismaField({
      type: 'StarCluster',
      nullable: false,
      args: { input: t.arg({ type: CreateStarClusterInput, required: true }) },
      resolve: async (query, _parent, { input }, _ctx) => {
        const createdStarCluster = await prisma.starCluster.create({
          ...query,
          data: {
            name: input.name,
          },
        });

        return createdStarCluster;
      },
    }),
  );

  builder.mutationField('updateStarCluster', (t) =>
    t.prismaField({
      type: 'StarCluster',
      nullable: true,
      args: { input: t.arg({ type: UpdateStarClusterInput, required: true }) },
      resolve: async (query, _parent, { input }, _ctx) => {
        const { id: rawId } = decodeGlobalID(input.id);
        const updatedStarCluster = await prisma.starCluster.update({
          ...query,
          where: {
            id: rawId,
          },
          data: {
            name: input.name,
          },
        });

        return updatedStarCluster;
      },
    }),
  );

  builder.mutationField('deleteStarCluster', (t) =>
    t.prismaField({
      type: 'StarCluster',
      nullable: true,
      args: { input: t.arg({ type: DeleteStarClusterInput, required: true }) },
      resolve: async (query, _parent, { input }) => {
        const { id: rawId } = decodeGlobalID(input.id);
        return await prisma.starCluster.delete({
          ...query,
          where: { id: rawId },
        });
      },
    }),
  );
};
