import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { prisma } from '~/.server/lib/prisma-client';
import { env } from '~/config/env';

const SESSION_SECRET = env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined');
}

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get('email');
  const password = form.get('password');

  if (!(email && password)) {
    throw new Error('Invalid Request');
  }

  const user = await prisma.user.findUnique({
    where: { email: String(email) },
  });

  if (!user) {
    console.log(`User with email ${email} does not exist`);
    throw new Error(`User with email ${email} does not exist`);
  }

  const passwordsMatch = await bcrypt.compare(String(password), user.password);

  if (!passwordsMatch) {
    console.log('Password does not match');
    throw new Error('Password does not match');
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
});

const authenticator = new Authenticator<Omit<User, 'password'>>();

// NOTE: フォームストラテジーには「user-pass」の名称を設定
authenticator.use(formStrategy, 'user-pass');

export { authenticator };
