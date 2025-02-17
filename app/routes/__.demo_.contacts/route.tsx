import { Link, Outlet, useNavigation } from 'react-router';
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

export const loader = async ({ request }: Route.LoaderArgs) => {
  // NOTE: orderByだと大文字が先に並び、小文字が後で並んでしまう。
  // const contacts = await prisma.contact.findMany({ orderBy: { first: 'asc' } });
  const contacts = await prisma.contact.findMany({});
  const sortedContacts = contacts.sort((a, b) =>
    a.first.toLowerCase().localeCompare(b.first.toLowerCase()),
  );

  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const filteredContacts = sortedContacts.filter((contact) =>
    q
      ? contact.first.toLowerCase().includes(q.toLowerCase()) ||
        contact.last.toLowerCase().includes(q.toLowerCase())
      : true,
  );
  return { contacts: filteredContacts, q };
};

const ContactsLayout = ({ loaderData }: Route.ComponentProps) => {
  const { contacts, q } = loaderData;
  // NOTE: useNavigationでナビゲーションの状態（loadingなど）を取得
  const navigation = useNavigation();

  // NOTE: データ読み込み中は、navigation.locationにデータが格納される
  // NOTE: navigation.location.searchでクエリパラメータ（'q=abc' etc.）を取得
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  // NOTE: navigation.locationの中身確認
  // useEffect(() => {
  //   console.log({ location: navigation.location });
  //   console.log({ search: navigation?.location?.search });
  // }, [navigation.location]);

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '20rem',
          '--sidebar-width-mobile': '20rem',
        } as React.CSSProperties
      }
    >
      <ContactsSidebar contacts={contacts} q={q} searching={searching} />
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
                <Link to="/demo">
                  <BreadcrumbLink>Demo</BreadcrumbLink>
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
          {/* NOTE: ローディング中（検索中は除く）はオーバーレイ */}
          {navigation.state === 'loading' && !searching && <Overlay />}
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ContactsLayout;
