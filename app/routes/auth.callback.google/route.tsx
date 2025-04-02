import { redirect } from 'react-router';
import { commitSession, getSession } from '~/sessions.server';
import { authenticator } from '../auth/services/auth.server';
import type { Route } from './+types/route';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const user = await authenticator.authenticate('google', request);
  const session = await getSession(request.headers.get('cookie'));
  session.set('user', user);

  // ユーザーが存在しない場合はログインページにリダイレクト
  if (!user) {
    return redirect('/auth/login', {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  }

  return redirect('/', {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
};
