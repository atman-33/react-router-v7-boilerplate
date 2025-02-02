import type { Contact } from '@prisma/client';
import { Link } from 'react-router';
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

interface ContactsSidebarProps {
  contacts: Contact[];
}

const ContactsSidebar = ({ contacts }: ContactsSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link to="/poc/contacts">
          <div className="flex items-center gap-2">
            <span className="font-bold">Remix Tutorial</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="pl-2">
        <SidebarGroup />
        <SidebarGroupLabel>Total {contacts.length}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {contacts.map((contact) => (
              <SidebarMenuItem key={contact.id}>
                <Link to={`/poc/pokemons/${contact.id}`}>
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
      </SidebarContent>
      <SidebarFooter className="border-t py-4 font-bold">
        React Router x shadcn/ui
      </SidebarFooter>
    </Sidebar>
  );
};

export { ContactsSidebar };
