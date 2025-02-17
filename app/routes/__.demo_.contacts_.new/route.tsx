import { redirect } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'new': {
      const newContact = {
        first: '',
        last: '',
        avatar: '',
        twitter: '',
        notes: '',
        favorite: false,
      };

      const res = await prisma.contact.create({ data: newContact });

      // トーストに表示するメッセージを格納
      const session = await getSession(request.headers.get('Cookie'));
      session.flash('toast', {
        type: 'success',
        message: 'Contact successfully created!',
      });

      // 編集ページにリダイレクト
      return redirect(`/demo/contacts/${res.id}/edit`, {
        headers: { 'Set-Cookie': await commitSession(session) },
      });
    }
  }
};
