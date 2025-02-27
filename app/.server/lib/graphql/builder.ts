import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import RelayPlugin from '@pothos/plugin-relay';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import PothosSimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import { Prisma } from '@prisma/client';
import { DateTimeResolver } from 'graphql-scalars';
import { prisma } from '../prisma-client';
import type { Context } from './context';

export const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
  AuthScopes: {
    loggedIn: boolean;
  };
  Connection: {
    totalCount: number | (() => number | Promise<number>);
  };
  PrismaTypes: PrismaTypes;
  Context: Context;
}>({
  plugins: [
    ScopeAuthPlugin,
    PrismaPlugin,
    RelayPlugin,
    PothosSimpleObjectsPlugin,
  ],
  scopeAuth: {
    authorizeOnSubscribe: true,
    authScopes: async (ctx) => ({
      loggedIn: !!ctx.user,
    }),
  },
  relay: {},
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
});

builder.queryType();
builder.mutationType();

builder.addScalarType('DateTime', DateTimeResolver, {});
