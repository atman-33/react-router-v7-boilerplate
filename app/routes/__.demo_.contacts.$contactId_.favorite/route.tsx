import { prisma } from '~/.server/lib/prisma-client';
import type { Route } from './+types/route';

export const action = async ({ params, request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const favorite = formData.get('favorite') === 'true';

  return await prisma.contact.update({
    where: { id: params.contactId },
    data: { favorite },
  });
};
