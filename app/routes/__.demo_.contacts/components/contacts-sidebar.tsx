import type { Contact } from '@prisma/client';
import { useEffect } from 'react';
import { Form, Link, NavLink, useSubmit } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '~/components/shadcn/ui/sidebar';
import { Image } from '~/components/shared/image';
import { SearchInput } from '~/components/shared/search-input';

interface ContactsSidebarProps {
  contacts: Contact[];
  q?: string | undefined | null;
  searching?: boolean;
}

const ContactsSidebar = ({
  contacts,
  q,
  searching = false,
}: ContactsSidebarProps) => {
  // NOTE: useSubmitでページ遷移を伴うForm送信を行う
  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById('q');
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || '';
    }
  }, [q]);

  return (
    <Sidebar>
      <SidebarHeader className="h-10 border-b">
        <Link to="/demo/contacts">
          <div className="flexitems-center gap-2">
            <span className="font-bold">Address Book</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="sticky top-0 z-10 bg-primary-foreground">
          <SidebarGroupContent className="flex gap-2">
            <Form
              action="./"
              method="get"
              onChange={(e) => {
                // NOTE: クエリパラメータ変更ではブラウザ履歴を追加しない
                const isFirstSearch = q === null;
                submit(e.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
            >
              <SearchInput
                type="search"
                defaultValue={q || ''}
                id="q"
                name="q"
                placeholder="Search"
                searching={searching}
              />
            </Form>
            <Form action="new" method="post">
              <Button
                variant="default"
                type="submit"
                name="_action"
                value="new"
              >
                New
              </Button>
            </Form>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Total {contacts.length}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {contacts.map((contact) => (
                <SidebarMenuItem key={contact.id} className="">
                  <NavLink
                    to={`./${contact.id}`}
                    className={({ isActive, isPending }) =>
                      `flex items-center ${
                        isActive
                          ? 'rounded-lg bg-blue-600 font-bold text-white'
                          : isPending
                            ? 'text-blue-400'
                            : 'text-primary'
                      }`
                    }
                  >
                    {/* NOTE: bg-inherit text-inherit を使ってNavLinkのStyleを継承する */}
                    <Button
                      variant="link"
                      className="flex w-full justify-start bg-inherit text-inherit hover:no-underline"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={contact.avatar}
                          aria-label={contact.id}
                          alt={`${contact.first} ${contact.last} avatar`}
                          className="w-6"
                        />
                        <span>
                          {contact.first || contact.last ? (
                            <>
                              {contact.first} {contact.last}
                            </>
                          ) : (
                            <i>No Name</i>
                          )}
                        </span>
                      </div>
                    </Button>
                    {contact.favorite && (
                      <div className="pr-2 text-xl text-yellow-500">★</div>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t py-4 font-bold">
        <Link to="/about">React Router Contacts</Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export { ContactsSidebar };
