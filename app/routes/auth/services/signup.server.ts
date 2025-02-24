import bcrypt from 'bcryptjs';
import { prisma } from '~/.server/lib/prisma-client';

export const createUser = async (
  data: Record<'name' | 'email' | 'password', string>,
) => {
  const { name, email, password } = data;

  if (!(name && email && password)) {
    throw new Error('Invalid input');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: { message: 'Email is already registered' } };
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword, image: '' },
  });

  return { id: newUser.id, email: newUser.email, name: newUser.name };
};
