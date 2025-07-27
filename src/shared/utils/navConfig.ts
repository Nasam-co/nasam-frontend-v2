import { LayoutDashboard, Package, ShoppingBasket } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  isActive: boolean;
}

export const navConfig: NavItem[] = [
  {
    name: "Overview",
    href: "/overview",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: Package,
    isActive: false,
  },
  {
    name: "Products",
    href: "/products",
    icon: ShoppingBasket,
    isActive: false,
  },
];
