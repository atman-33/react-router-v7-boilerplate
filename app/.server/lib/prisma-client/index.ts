import { PrismaClient } from '@prisma/client';
import { singleton } from '~/utils/singleton';

export const prisma = singleton('prisma', () => new PrismaClient());
