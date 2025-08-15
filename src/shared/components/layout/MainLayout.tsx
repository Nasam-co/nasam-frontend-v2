import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
} from "@/shared/components/ui/sidebar";
import { NasamSidebar } from "./Sidebar";
import { useLanguage } from "@/shared/hooks/useLanguage";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Loader2 } from "lucide-react";
import { useSellers } from "@/shared/hooks/useSellers";
import Header from "./Header";

export const MainLayout: React.FC = () => {
  const { isRTL } = useLanguage();
  const { isLoading, sellers } = useSellers();
  const { fetchAndStoreUser, hasInitializedUser, isLoading: authLoading } = useAuthStore();

  // Fetch user on first load/refresh
  useEffect(() => {
    if (!hasInitializedUser) {
      fetchAndStoreUser();
    }
  }, [hasInitializedUser, fetchAndStoreUser]);

  return (
    <div lang={isRTL ? "ar" : "en"} dir={isRTL ? "rtl" : "ltr"}>
      <SidebarProvider>
        <Sidebar side={isRTL ? "right" : "left"}>
          <NasamSidebar />
        </Sidebar>
        <SidebarInset>
          {(isLoading || authLoading || !hasInitializedUser) ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            <>
              <Header sellers={sellers} />
              <main className="flex-1 p-6">
                <Outlet />
              </main>
            </>
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
