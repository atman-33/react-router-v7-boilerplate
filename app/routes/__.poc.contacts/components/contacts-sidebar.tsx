import type { Contact } from '@prisma/client';
import { useState } from 'react';
import { Form, Link, NavLink } from 'react-router';
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
import { SearchInput } from '~/components/shared/search-input';

interface ContactsSidebarProps {
  contacts: Contact[];
}

const ContactsSidebar = ({ contacts }: ContactsSidebarProps) => {
  const [query, setQuery] = useState('');

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link to="/poc/contacts">
          <div className="flex items-center gap-2">
            <span className="font-bold">Remix Tutorial</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="sticky top-0 z-10 bg-primary-foreground">
          <SidebarGroupContent className="flex gap-2">
            <SearchInput value={query} onInputChange={setQuery} />
            <Form action="./" method="post">
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
            <SidebarMenu className="flex flex-col gap-4">
              {contacts.map((contact) => (
                <SidebarMenuItem key={contact.id}>
                  <NavLink
                    to={`/poc/contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'font-bold text-blue-500'
                        : isPending
                          ? 'text-yellow-500'
                          : 'text-gray-500'
                    }
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={contact.avatar}
                        alt="404"
                        aria-label={contact.id}
                        className="w-8"
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
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t py-4 font-bold">
        Remix Contacts
      </SidebarFooter>
    </Sidebar>
  );
};

export { ContactsSidebar };
