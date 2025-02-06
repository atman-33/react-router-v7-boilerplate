import type { Contact } from '@prisma/client';
import { useFetcher } from 'react-router';

export const Favorite = ({ contact }: { contact: Contact }) => {
  // NOTE: 画面遷移させないためにfetcherを使用する
  const fetcher = useFetcher();
  const favorite = contact.favorite;

  return (
    <fetcher.Form action="favorite" method="post">
      <button
        type="submit"
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? (
          <div className="text-5xl text-yellow-500">★</div>
        ) : (
          <div className="text-5xl">☆</div>
        )}
      </button>
    </fetcher.Form>
  );
};
