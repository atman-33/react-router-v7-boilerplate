import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { prisma } from '~/.server/lib/prisma-client';
import { env } from '~/config/env';
import { GoogleStrategy } from './auth-google.server';

const SESSION_SECRET = env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined');
}

// --- FormStrategy
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

// --- GoogleStrategy
if (!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.CLIENT_URL)) {
  throw new Error(
    'GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and CLIENT_URL are not defined.',
  );
}

const googleStrategy = new GoogleStrategy<User>(
  {
    clientId: env.GOOGLE_CLIENT_ID || '',
    clientSecret: env.GOOGLE_CLIENT_SECRET || '',
    redirectURI: `${env.CLIENT_URL}/auth/callback/google`,
  },
  async ({ tokens }) => {
    const profile = await GoogleStrategy.userProfile(tokens);

    try {
      const user = await prisma.user.findUnique({
        where: { email: profile.emails[0].value },
      });

      if (user) {
        return user;
      }
    } catch (e) {
      throw new Error((e as Error).message);
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          // NOTE: MongoDB等のIDを自動割付するデータベースではidは不要となる
          id: profile.id,
          email: profile.emails[0].value || '',
          password: '',
          name: profile.displayName,
          image: profile.photos[0].value || '',
          provider: 'google',
        },
      });
      return newUser;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  },
);

authenticator.use(googleStrategy); // name: 'google'

export { authenticator };
