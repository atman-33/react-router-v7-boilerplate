import type React from 'react';
import { Form, Outlet, useSubmit } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { Button } from '~/components/shadcn/ui/button';
import { Image } from '~/components/shared/image';
import { AlertDialog } from '~/components/shared/react-call/alert-dialog';
import type { Route } from './+types/route';
import { Favorite } from './components/favorite';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const contact = await prisma.contact.findUnique({
    where: { id: params.contactId },
  });

  if (!contact) {
    throw new Response('Not Found', { status: 404 });
  }

  return { contact };
};

const ContactPage = ({ loaderData }: Route.ComponentProps) => {
  const { contact } = loaderData;
  const submit = useSubmit();

  const handleDeleteSubmit = async (event: React.FormEvent) => {
    // フォームの送信をキャンセル
    event.preventDefault();

    const res = await AlertDialog.call({
      message: 'Please confirm you want to delete this record.',
    });

    if (res === 'cancel') {
      return;
    }

    const formData = event.currentTarget as HTMLFormElement;
    submit(formData, { method: 'post', action: 'destroy' });
  };

  if (!contact) {
    return <div>not found</div>;
  }

  return (
    <>
      {/* 通常は横並び。画面幅が小さくなると縦並び */}
      <div className="flex flex-col gap-12 sm:flex-row">
        <div>
          <Image
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
            className="h-auto min-w-60 max-w-60 rounded-3xl"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="flex items-center gap-4 font-extrabold text-3xl">
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}
            <Favorite contact={contact} />
          </h1>

          {contact.twitter ? (
            <p>
              <a
                href={`https://twitter.com/${contact.twitter}`}
                className=" text-blue-600 text-xl"
                target="_blank"
                rel="noreferrer"
              >
                {contact.twitter}
              </a>
            </p>
          ) : null}

          {contact.notes ? <p>{contact.notes}</p> : null}

          <div className="flex gap-4">
            <Form action="edit">
              <Button type="submit">Edit</Button>
            </Form>

            <Form
              action="destroy"
              method="post"
              onSubmit={(event) => handleDeleteSubmit(event)}
            >
              <Button variant="destructive" type="submit">
                Delete
              </Button>
            </Form>
          </div>
        </div>
      </div>
      {/* モーダル表示用のOutlet */}
      <Outlet />
    </>
  );
};

export default ContactPage;
