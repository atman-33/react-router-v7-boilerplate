import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';

const signUpFormSchema = z.object({
  name: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required')
    .max(64, 'Username must be 64 characters or less'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .max(128, 'Email must be 128 characters or less'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be 128 characters or less')
    .refine(
      (password: string) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      'Password must contain both letters and numbers',
    ),
});

const useSignUpForm = () => {
  const form = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpFormSchema });
    },
  });

  return form;
};

export { useSignUpForm };
