import type { Contact } from '@prisma/client';
import { useState } from 'react';
import { Link } from 'react-router';
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
        <SidebarGroup>
          <SidebarGroupContent className="flex gap-2">
            <SearchInput value={query} onInputChange={setQuery} />
            <Button variant="default">New</Button>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Total {contacts.length}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contacts.map((contact) => (
                <SidebarMenuItem key={contact.id}>
                  <Link to={`/poc/contacts/${contact.id}`}>
                    <div className="flex items-center gap-2">
                      <img
                        src={contact.avatar}
                        alt="404"
                        aria-label={contact.id}
                        className="w-8"
                      />
                      <span>{`${contact.first} ${contact.last}`}</span>
                    </div>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t py-4 font-bold">
        React Router x shadcn/ui
      </SidebarFooter>
    </Sidebar>
  );
};

export { ContactsSidebar };
