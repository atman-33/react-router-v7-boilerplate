import type { User } from '@prisma/client';
import type { YogaInitialContext } from 'graphql-yoga';

export interface Context extends YogaInitialContext {
  user?: User;
}
