import { LayoutDashboard, Package, ShoppingBasket } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  isActive: boolean;
  translationKey: string;
}

export const navConfig: NavItem[] = [
  {
    name: 'Overview',
    href: '/overview',
    icon: LayoutDashboard,
    isActive: true,
    translationKey: 'navigation.overview',
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: Package,
    isActive: false,
    translationKey: 'navigation.orders',
  },
  {
    name: 'Products',
    href: '/products',
    icon: ShoppingBasket,
    isActive: false,
    translationKey: 'navigation.products',
  },
  {
    name: 'Marketplace Accounts',
    href: '/marketplace-accounts',
    icon: ShoppingBasket,
    isActive: false,
    translationKey: 'navigation.marketplace-accounts',
  },
];
