import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'tools/graphql-codegen/schema.graphql',
  overwrite: true,
  documents: ['app/**/*.tsx', 'app/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  hooks: { afterAllFileWrite: ['biome check --write'] },
  generates: {
    './app/.server/lib/graphql/@generated/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: { DateTime: 'string' },
      },
    },
  },
};

export default config;
