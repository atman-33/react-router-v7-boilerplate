import { getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useEffect } from 'react';
import { Form } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Label } from '~/components/shadcn/ui/label';
import { ConformInput } from '~/components/shared/conform/conform-input';
import type { Route } from './+types/route';
import { sampleFormSchema, useSampleForm } from './hooks/use-sample-form';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  // サーバーサイド側のバリデーションチェック
  const submission = parseWithZod(formData, { schema: sampleFormSchema });

  if (submission.status !== 'success') {
    return {
      success: false,
      message: 'error!',
      submission: submission.reply(),
    };
  }

  // ここでDB登録処理などを実装する

  return {
    success: true,
    message: 'success!',
    submission: submission.reply(),
  };
};

const DemoConformPage = ({ actionData }: Route.ComponentProps) => {
  const [form, { name, email }] = useSampleForm();

  useEffect(() => {
    console.log(actionData);

    if (actionData) {
      // メッセージ表示
      window.confirm(actionData?.message);
    }
  }, [actionData]);

  return (
    <Form method="post" {...getFormProps(form)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <ConformInput
          metadata={name}
          type="text"
          placeholder="name..."
          defaultValue={'abc'}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <ConformInput
          metadata={email}
          type="email"
          placeholder="email..."
          defaultValue={'abc@test.com'}
        />
      </div>
      <Button className="self-start" type="submit">
        Regist
      </Button>
    </Form>
  );
};

export default DemoConformPage;
