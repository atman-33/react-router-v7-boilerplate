import { Form, Outlet } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { Button } from '~/components/shadcn/ui/button';
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

  if (!contact) {
    return <div>not found</div>;
  }

  return (
    <div className="flex gap-12">
      <div>
        <img
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
          className="w-60 rounded-3xl"
        />
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="flex gap-4 font-extrabold text-3xl">
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
            onSubmit={(event) => {
              const response = confirm(
                'Please confirm you want to delete this record.',
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </Form>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ContactPage;
