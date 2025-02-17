import { getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useEffect } from 'react';
import { redirect, useFetcher, useNavigate } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { showToast } from '~/components/shadcn/custom/custom-sonner';
import { DialogContentNoCloseButton } from '~/components/shadcn/custom/dialog-content-no-close-button';
import { Button } from '~/components/shadcn/ui/button';
import { Dialog } from '~/components/shadcn/ui/dialog';
import { Label } from '~/components/shadcn/ui/label';
import { ConformInput } from '~/components/shared/conform/conform-input';
import { ConformTextarea } from '~/components/shared/conform/conform-textarea';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';
import {
  contactEditFormSchema,
  useContactEditForm,
} from './hooks/use-contact-edit-form';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const contact = await prisma.contact.findUnique({
    where: { id: params.contactId },
  });
  return { contact };
};

export const action = async ({ params, request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: contactEditFormSchema });

  // バリデーションエラーの場合
  if (submission.status !== 'success') {
    return {
      success: false,
      message: 'error!',
      submission: submission.reply(),
    };
  }

  // NOTE: FormDataから全てのFormフィールド（name属性を持つ）の名前と値をオブジェクトに変換
  const updates = Object.fromEntries(formData);
  // console.log({ ...updates });
  await prisma.contact.update({
    where: { id: params.contactId },
    data: { ...updates },
  });

  // トーストに表示するメッセージを格納
  const session = await getSession(request.headers.get('Cookie'));
  session.flash('toast', {
    type: 'success',
    message: 'Contact successfully updated!',
  });

  return redirect(`/demo/contacts/${params.contactId}`, {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
};

const ContactEditPage = ({ loaderData, actionData }: Route.ComponentProps) => {
  const { contact } = loaderData;
  const [form, { first, last, twitter, avatar, notes }] = useContactEditForm();
  const fetcher = useFetcher<typeof actionData>();
  // NOTE: useNavigateはブラウザ履歴で戻る操作をするために利用
  const navigate = useNavigate();

  useEffect(() => {
    // NOTE: fetcher.Formを利用しているため、actionDataがfetcher.dataが格納される
    if (fetcher.data && !fetcher.data.success) {
      showToast('Error', { description: fetcher.data.message }, 'error');
    }
  }, [fetcher.data]);

  if (!contact) {
    return <div>not found</div>;
  }

  return (
    <Dialog open={true}>
      {/* Dialogの横幅は、max-w-xxxで制御する */}
      <DialogContentNoCloseButton className="max-w-2xl">
        <fetcher.Form
          {...getFormProps(form)}
          key={contact.id}
          method="post"
          className="grid grid-cols-[auto,1fr] items-center gap-4"
        >
          <Label className="w-32 md:w-40">Name</Label>
          <div className="flex gap-4">
            <ConformInput
              metadata={first}
              aria-label="First name"
              defaultValue={contact.first}
              name="first"
              placeholder="First"
              type="text"
            />
            <ConformInput
              metadata={last}
              aria-label="Last name"
              defaultValue={contact.last}
              name="last"
              placeholder="Last"
              type="text"
            />
          </div>
          <Label>Twitter</Label>

          <ConformInput
            metadata={twitter}
            defaultValue={contact.twitter}
            name="twitter"
            placeholder="@jack"
            type="text"
          />
          <Label>Avatar URL</Label>
          <ConformInput
            metadata={avatar}
            aria-label="Avatar URL"
            defaultValue={contact.avatar}
            name="avatar"
            placeholder="https://example.com/avatar.jpg"
            type="text"
          />
          <Label className="mt-2 self-start">Notes</Label>
          <ConformTextarea
            metadata={notes}
            defaultValue={contact.notes ?? ''}
            name="notes"
            rows={6}
          />
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
            {/* NOTE: <button type="button">は、ボタンがフォームを送信するのを防ぐHTMLの方法 */}
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </fetcher.Form>
      </DialogContentNoCloseButton>
    </Dialog>
  );
};

export default ContactEditPage;
