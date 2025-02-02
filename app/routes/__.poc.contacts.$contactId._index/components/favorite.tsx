import type { Contact } from '@prisma/client';
import { Form } from 'react-router';

export const Favorite = ({ contact }: { contact: Contact }) => {
  const favorite = contact.favorite;

  return (
    <Form method="post">
      <button
        type="button"
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? '⭐' : '☆'}
      </button>
    </Form>
  );
};
