import { Form } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { Button } from '~/components/shadcn/ui/button';
import { Input } from '~/components/shadcn/ui/input';
import { Label } from '~/components/shadcn/ui/label';
import { Textarea } from '~/components/shadcn/ui/textarea';
import type { Route } from './+types/route';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const contact = await prisma.contact.findUnique({
    where: { id: params.contactId },
  });
  return { contact };
};

const EditContactPage = ({ loaderData }: Route.ComponentProps) => {
  const { contact } = loaderData;

  if (!contact) {
    return <div>not found</div>;
  }

  return (
    <Form
      key={contact.id}
      method="post"
      className="grid grid-cols-[auto,1fr] items-center gap-4"
    >
      <Label className="w-32 md:w-40">Name</Label>
      <div className="flex gap-4">
        <Input
          aria-label="First name"
          defaultValue={contact.first}
          name="first"
          placeholder="First"
          type="text"
        />
        <Input
          aria-label="Last name"
          defaultValue={contact.last}
          name="last"
          placeholder="Last"
          type="text"
        />
      </div>
      <Label>Twitter</Label>

      <Input
        defaultValue={contact.twitter}
        name="twitter"
        placeholder="@jack"
        type="text"
      />
      <Label>Avatar URL</Label>
      <Input
        aria-label="Avatar URL"
        defaultValue={contact.avatar}
        name="avatar"
        placeholder="https://example.com/avatar.jpg"
        type="text"
      />
      <Label className="mt-2 self-start">Notes</Label>
      <Textarea defaultValue={contact.notes ?? ''} name="notes" rows={6} />
      <div className="col-start-2 flex gap-4">
        <Button type="submit">Save</Button>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditContactPage;
