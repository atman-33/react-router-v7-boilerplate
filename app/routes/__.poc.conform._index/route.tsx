import { getFormProps } from '@conform-to/react';
import { Form } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Label } from '~/components/shadcn/ui/label';
import { ConformInput } from '~/components/shared/conform/conform-input';
import { useSampleForm } from './hooks/use-sample-form';

const PocConformPage = () => {
  const [form, { name, email }] = useSampleForm();

  return (
    <Form method="post" {...getFormProps(form)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <ConformInput
          metadata={name}
          options={{ type: 'text' }}
          placeholder="name..."
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <ConformInput
          metadata={email}
          options={{ type: 'email' }}
          placeholder="email..."
        />
      </div>
      <Button className="self-start" type="submit">
        Regist
      </Button>
    </Form>
  );
};

export default PocConformPage;
