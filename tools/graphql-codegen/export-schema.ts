import fs from 'node:fs';
import path from 'node:path';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { schema } from '~/.server/lib/graphql/schema';

const main = async () => {
  const outputFile = './tools/graphql-codegen/schema.graphql';

  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  await fs.writeFileSync(outputFile, schemaAsString);
  console.log(`🌙${path.resolve(outputFile)} is created!`);
};

main();
