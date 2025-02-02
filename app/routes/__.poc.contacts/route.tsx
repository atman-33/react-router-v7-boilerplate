import { Link, Outlet } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/shadcn/ui/breadcrumb';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/shadcn/ui/sidebar';
import type { Route } from './+types/route';
import { ContactsSidebar } from './components/contacts-sidebar';

export const loader = async () => {
  const contacts = await prisma.contact.findMany({});
  return { contacts };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'new': {
      const newContact = {
        first: 'No',
        last: 'Name',
        avatar: '',
        twitter: '',
        notes: '',
        favorite: false,
      };

      await prisma.contact.create({ data: newContact });
      // TODO: 編集ページにリダイレクトする処理を追加
    }
  }
};

const ContactsLayout = ({ loaderData }: Route.ComponentProps) => {
  const { contacts } = loaderData;
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '20rem',
          '--sidebar-width-mobile': '20rem',
        } as React.CSSProperties
      }
    >
      <ContactsSidebar contacts={contacts} />
      <SidebarInset>
        <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/">
                  <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/poc">
                  <BreadcrumbLink>PoC</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Remix Tutorial</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ContactsLayout;
