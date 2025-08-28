'use client';

import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function AppSidebar({ user }: { user: User | undefined; }) {
  const router = useRouter();
  const { setOpenMobile, open, setOpen } = useSidebar();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                {open ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {open && (
                <Link
                  href="/"
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                  className="flex items-center"
                >
                  <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                    MusicAI
                  </span>
                </Link>
              )}
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      {open && (
        <>
          <SidebarContent>
            <SidebarMenu>
              <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
                Navigation
              </div>
              <Link
                href="/"
                onClick={() => setOpenMobile(false)}
                className="flex items-center gap-2 px-2 py-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md"
              >
                Chord Explorer
              </Link>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
        </>
      )}
    </Sidebar>
  );
}
