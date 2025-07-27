import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/components/ui/button";
import { LogOut, User, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/authStore";
import toast from "react-hot-toast";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { navConfig, NavItem } from "@/shared/utils/navConfig";

export const NasamSidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const { state } = useSidebar();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t("auth.logoutSuccess"));
    } catch {
      toast.error(t("auth.logoutError"));
    }
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <>
      <SidebarHeader className="flex items-center justify-center mb-10">
        <img
          width={150}
          height={150}
          src="./assets/images/nasam-logo.png"
          alt="Nasam Logo"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {navConfig.map((item: NavItem) => (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link to={item.href}>
                      <item.icon />
                      <span>{t(item.translationKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer",
                state === "collapsed" ? "justify-center" : ""
              )}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="w-8 h-8 bg-[--color-nasam-accent] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-[--color-nasam-secondary]" />
              </div>
              {state !== "collapsed" && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-sidebar-foreground/70 truncate">
                      {user?.email || "admin@nasam.com"}
                    </p>
                  </div>
                  {userMenuOpen ? (
                    <ChevronDown className="h-4 w-4 text-sidebar-foreground/50" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-sidebar-foreground/50" />
                  )}
                </>
              )}
            </div>

            {userMenuOpen && state !== "collapsed" && (
              <div className="mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  {t("navigation.logout")}
                </Button>
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};
