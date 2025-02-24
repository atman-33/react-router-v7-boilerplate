import { getFormProps } from '@conform-to/react';
import { AlertCircle } from 'lucide-react';
import { Form, Link, redirect } from 'react-router';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '~/components/shadcn/ui/alert';
import { Button } from '~/components/shadcn/ui/button';
import { Label } from '~/components/shadcn/ui/label';
import { ConformInput } from '~/components/shared/conform/conform-input';
import { commitSession, getSession } from '~/sessions.server';
import { authenticator } from '../auth/services/auth.server';
import type { Route } from './+types/route';
import { GoogleForm } from './components/google-form';
import { useLoginForm } from './hooks/use-login-form';

export const action = async ({ request }: Route.ActionArgs) => {
  // NOTE:
  // cloneせずに値を取得すると、action関数とauthenticatorで2回リクエスト本文（formData）にアクセスすることになってしまいエラーとなる。
  // React Routerではリクエストには1回しかアクセスできないため、リクエストのクローンを作成して、そのクローンをリクエストとして読み取る必要がある。
  const formData = await request.clone().formData();
  const action = String(formData.get('_action'));

  try {
    switch (action) {
      case 'Sign In': {
        const user = await authenticator.authenticate('user-pass', request);
        const session = await getSession(request.headers.get('cookie'));
        session.set('user', user);
        return redirect('/auth/login', {
          headers: { 'Set-Cookie': await commitSession(session) },
        });
      }

      case 'Sign In Google': {
        return await authenticator.authenticate('google', request);
      }

      default:
        throw new Error('Unknown action');
    }
  } catch (e) {
    // NOTE: この記述がないとGoogle認証成功時にリダイレクトできない
    if (e instanceof Response) {
      return e;
    }

    // 認証失敗時にthrowしたエラー
    if (e instanceof Error) {
      return { message: e.message, status: 401 };
    }

    // その他のエラー
    return { message: 'Unknown error', status: 401 };
  }
};

const LoginPage = ({ actionData }: Route.ComponentProps) => {
  const data = actionData as { message?: string };
  const [form, { email, password }] = useLoginForm();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-5">
      <div className="w-[420px] rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-center font-extrabold text-3xl text-black-600">
          Login
        </h2>
        <Form method="post" {...getFormProps(form)}>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Email</Label>
              <ConformInput metadata={email} type="email" />
            </div>
            <div>
              <Label>Password</Label>
              <ConformInput metadata={password} type="password" />
            </div>
            <Button
              variant="default"
              type="submit"
              name="_action"
              value="Sign In"
              className="mt-4 self-center"
            >
              Login
            </Button>
            {data?.message && (
              <Alert variant="destructive" className="my-1">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{data.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </Form>
        <GoogleForm />
      </div>
      <p className="text-gray-600">
        {`Don't have an account? `}
        <Link to="/auth/signup">
          <span className="px-2 text-primary hover:underline">Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
