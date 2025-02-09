import { createCookieSessionStorage } from 'react-router';
import type { ToastType } from './components/shadcn/custom/custom-sonner';
import { env } from './config/env';

type SessionData = {
  // NOTE: auth実装に合わせて変更する
  userId: string;
};

type SessionFlashData = {
  toast: {
    type: ToastType;
    message: string;
  };
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
      secrets: [env.SESSION_SECRET || ''],
      secure: process.env.NODE_ENV === 'production',
    },
  });

export { commitSession, destroySession, getSession };
