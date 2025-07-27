import React from "react";
import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
} from "@/shared/components/ui/sidebar";
import { Header } from "./Header";
import { NasamSidebar } from "./Sidebar";
import { useLanguage } from "@/shared/hooks/useLanguage";

export const MainLayout: React.FC = () => {
  const { isRTL } = useLanguage();
  return (
    <div lang={isRTL ? "ar" : "en"} dir={isRTL ? "rtl" : "ltr"}>
      <SidebarProvider>
        <Sidebar side={isRTL ? "right" : "left"}>
          <NasamSidebar />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
