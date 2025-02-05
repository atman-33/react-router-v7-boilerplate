import { Link, Outlet, redirect, useNavigation } from 'react-router';
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
import { Overlay } from '~/components/shared/overlay';
import type { Route } from './+types/route';
import { ContactsSidebar } from './components/contacts-sidebar';

export const loader = async () => {
  // NOTE: orderByだと大文字が先に並び、小文字が後で並んでしまう。
  // const contacts = await prisma.contact.findMany({ orderBy: { first: 'asc' } });
  const contacts = await prisma.contact.findMany({});
  const sortedContacts = contacts.sort((a, b) =>
    a.first.toLowerCase().localeCompare(b.first.toLowerCase()),
  );
  return { contacts: sortedContacts };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'new': {
      const newContact = {
        first: '',
        last: '',
        avatar: '',
        twitter: '',
        notes: '',
        favorite: false,
      };

      const res = await prisma.contact.create({ data: newContact });
      // 編集ページにリダイレクト
      return redirect(`/poc/contacts/${res.id}/edit`);
    }
  }
};

const ContactsLayout = ({ loaderData }: Route.ComponentProps) => {
  const { contacts } = loaderData;
  // NOTE: useNavigationでナビゲーションの状態（loadingなど）を取得
  const navigation = useNavigation();

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
        <div className="px-12 py-8">
          {navigation.state === 'loading' ||
            (navigation.state === 'submitting' && <Overlay />)}
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ContactsLayout;
