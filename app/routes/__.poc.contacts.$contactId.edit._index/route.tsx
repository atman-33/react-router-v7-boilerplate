import { Link, redirect, useFetcher } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { DialogContentNoCloseButton } from '~/components/shadcn/custom/dialog-content-no-close-button';
import { Button } from '~/components/shadcn/ui/button';
import { Dialog } from '~/components/shadcn/ui/dialog';
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

export const action = async ({ params, request }: Route.ActionArgs) => {
  const formData = await request.formData();
  // NOTE: FormDataから全てのFormフィールド（name属性を持つ）の名前と値をオブジェクトに変換
  const updates = Object.fromEntries(formData);
  // console.log({ ...updates });
  await prisma.contact.update({
    where: { id: params.contactId },
    data: { ...updates },
  });

  return redirect(`/poc/contacts/${params.contactId}`);
};

const ContactEditPage = ({ loaderData }: Route.ComponentProps) => {
  const { contact } = loaderData;
  const fetcher = useFetcher();

  if (!contact) {
    return <div>not found</div>;
  }

  return (
    <Dialog open={true}>
      {/* Dialogの横幅は、max-w-xxxで制御する */}
      <DialogContentNoCloseButton className="max-w-2xl">
        <fetcher.Form
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
            {/* fetcherが処理中（submitting/loading）の時はdisableにする */}
            <Button
              type="submit"
              disabled={
                fetcher.state === 'submitting' || fetcher.state === 'loading'
              }
            >
              Save
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link to={'../'}>Cancel</Link>
            </Button>
          </div>
        </fetcher.Form>
      </DialogContentNoCloseButton>
    </Dialog>
  );
};

export default ContactEditPage;
