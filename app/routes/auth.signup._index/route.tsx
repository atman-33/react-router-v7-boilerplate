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
import { GoogleForm } from '../auth.login._index/components/google-form';
import { authenticator } from '../auth/services/auth.server';
import { createUser } from '../auth/services/signup.server';
import type { Route } from './+types/route';
import { useSignUpForm } from './hooks/use-signup-form';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.clone().formData();
  const action = String(formData.get('_action'));

  try {
    switch (action) {
      case 'Sign Up': {
        const name = String(formData.get('name'));
        const email = String(formData.get('email'));
        const password = String(formData.get('password'));
        const errors: { [key: string]: string } = {};

        if (
          typeof action !== 'string' ||
          typeof name !== 'string' ||
          typeof email !== 'string' ||
          typeof password !== 'string'
        ) {
          return { error: 'Invalid Form Data', form: action, status: 400 };
        }

        const result = await createUser({ name, email, password });

        if (result.error) {
          errors.email = result.error.message;
        }

        if (Object.keys(errors).length > 0) {
          return { errors };
        }

        const user = await authenticator.authenticate('user-pass', request);
        const session = await getSession(request.headers.get('cookie'));
        session.set('user', user);
        if (user) {
          return redirect('/auth/login', {
            headers: { 'Set-Cookie': await commitSession(session) },
          });
        }
        break;
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

const SignUpPage = ({ actionData }: Route.ComponentProps) => {
  const errors = (actionData as { errors?: { [key: string]: string } })?.errors;
  const [form, { name, email, password }] = useSignUpForm();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-5">
      <div className="w-[420px] rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-center font-extrabold text-3xl text-black-600">
          Create an account
        </h2>
        <Form method="POST" {...getFormProps(form)}>
          <div className="flex flex-col">
            <div>
              <Label>Name</Label>
              <ConformInput metadata={name} type="text" />
            </div>

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
              value="Sign Up"
              className="mt-4 self-center"
            >
              Create an account
            </Button>
            {errors?.email && (
              <Alert variant="destructive" className="my-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors?.email}</AlertDescription>
              </Alert>
            )}
          </div>
        </Form>
        <GoogleForm />
      </div>
      <p className="text-gray-600">
        {'Already have an account? '}
        <Link to="/auth/login">
          <span className="px-2 text-primary hover:underline">Sign In</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
