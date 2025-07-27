import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarProvider, SidebarInset } from '@/shared/components/ui/sidebar';
import { Header } from './Header';
import { NasamSidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <NasamSidebar />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};