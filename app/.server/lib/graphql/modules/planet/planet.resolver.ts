import { decodeGlobalID } from '@pothos/plugin-relay';
import { prisma } from '~/.server/lib/prisma-client';
import { builder } from '../../builder';
import { GetPlanetArgs } from './dto/args/get-planet-args.dto';
import { CreatePlanetInput } from './dto/input/create-planet-input.dto';
import { DeletePlanetInput } from './dto/input/delete-planet-input.dto';
import { UpdatePlanetInput } from './dto/input/update-planet-input.dto';

export const definePlanetResolver = () => {
  // --- Query
  builder.queryField('planets', (t) =>
    t.prismaConnection({
      type: 'Planet',
      cursor: 'id',
      resolve: (query) => prisma.planet.findMany({ ...query }),
      totalCount: () => prisma.planet.count(),
    }),
  );

  builder.queryField('planet', (t) =>
    t.prismaField({
      type: 'Planet',
      args: { args: t.arg({ type: GetPlanetArgs, required: true }) },
      resolve: async (query, _parent, { args }) => {
        const { id: rawId } = decodeGlobalID(args.id);
        return await prisma.planet.findUnique({
          ...query,
          where: { id: rawId },
        });
      },
    }),
  );

  // --- Mutation
  builder.mutationField('createPlanet', (t) =>
    t.prismaField({
      type: 'Planet',
      nullable: false,
      args: { input: t.arg({ type: CreatePlanetInput, required: true }) },
      resolve: async (query, _parent, { input }, _ctx) => {
        const createdPlanet = await prisma.planet.create({
          ...query,
          data: {
            name: input.name,
          },
        });

        if (input.starClusterIds && input.starClusterIds.length > 0) {
          const starClusterInputs = input.starClusterIds.map(
            (starClusterId) => ({
              planetId: createdPlanet.id,
              starClusterId,
            }),
          );

          await prisma.planetStarCluster.createMany({
            data: starClusterInputs,
          });
        }

        return createdPlanet;
      },
    }),
  );

  builder.mutationField('updatePlanet', (t) =>
    t.prismaField({
      type: 'Planet',
      nullable: true,
      args: { input: t.arg({ type: UpdatePlanetInput, required: true }) },
      resolve: async (query, _parent, { input }, _ctx) => {
        const { id: rawId } = decodeGlobalID(input.id);
        const updatedPlanet = await prisma.planet.update({
          ...query,
          where: {
            id: rawId,
          },
          data: {
            name: input.name,
          },
        });

        if (input.starClusterIds) {
          await prisma.planetStarCluster.deleteMany({
            where: {
              planetId: rawId,
            },
          });

          if (input.starClusterIds.length > 0) {
            const starClusterInputs = input.starClusterIds.map(
              (starClusterId) => ({
                planetId: updatedPlanet.id,
                starClusterId,
              }),
            );

            await prisma.planetStarCluster.createMany({
              data: starClusterInputs,
            });
          }
        }

        return updatedPlanet;
      },
    }),
  );

  builder.mutationField('deletePlanet', (t) =>
    t.prismaField({
      type: 'Planet',
      nullable: true,
      args: { input: t.arg({ type: DeletePlanetInput, required: true }) },
      resolve: async (query, _parent, { input }) => {
        const { id: rawId } = decodeGlobalID(input.id);
        return await prisma.planet.delete({
          ...query,
          where: { id: rawId },
        });
      },
    }),
  );
};
