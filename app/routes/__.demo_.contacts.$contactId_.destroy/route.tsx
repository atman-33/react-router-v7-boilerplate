import { type ActionFunctionArgs, redirect } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { commitSession, getSession } from '~/sessions.server';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  await prisma.contact.delete({ where: { id: params.contactId } });

  // トーストに表示するメッセージを格納
  const session = await getSession(request.headers.get('Cookie'));
  session.flash('toast', {
    type: 'success',
    message: 'Contact successfully deleted!',
  });

  return redirect('/demo/contacts', {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
};
