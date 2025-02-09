import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';

const contactEditFormSchema = z.object({
  first: z.string({ required_error: 'First is required' }),
  last: z.string({ required_error: 'Last is required' }),
  twitter: z.string().optional(),
  avatar: z.string().url('Avatar must be a valid URL').optional(),
  notes: z.string().optional(),
});

const useContactEditForm = () => {
  const form = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactEditFormSchema });
    },
  });

  return form;
};

export { contactEditFormSchema, useContactEditForm };
