import React, { useState, useEffect } from 'react';
import { Upload, ShoppingCart, Store, Check, X, AlertCircle, ExternalLink, Key, Loader2, Package, RefreshCw, Globe, Settings, User, BarChart3, ShoppingBag, ChevronDown, Download } from 'lucide-react';

// CSS Custom Properties
const cssVariables = `
:root {
  --radius: 0.625rem;
  --background: #f5f5f5;
  --foreground: #133d4a;
  --card: #ffffff;
  --card-foreground: #133d4a;
  --popover: #ffffff;
  --popover-foreground: #133d4a;
  --primary: #23515f;
  --primary-foreground: #ffffff;
  --secondary: #e5eef0;
  --secondary-foreground: #133d4a;
  --muted: #f2e1c9;
  --muted-foreground: #23515f;
  --accent: #d6b984;
  --accent-foreground: #133d4a;
  --destructive: #dc2626;
  --border: #e5eef0;
  --input: #e5eef0;
  --ring: #d6b984;
  --chart-1: #23515f;
  --chart-2: #133d4a;
  --chart-3: #d6b984;
  --chart-4: #f2e1c9;
  --chart-5: #e5eef0;
  --sidebar: #23515f;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #d6b984;
  --sidebar-primary-foreground: #133d4a;
  --sidebar-accent: #133d4a;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #133d4a;
  --sidebar-ring: #d6b984;
}
`;

// Mock data and types
interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  inventory: number;
}

interface Seller {
  id: number;
  name: string;
  email: string;
}

interface Marketplace {
  id: number;
  name: string;
  logoUrl?: string;
  requiresOAuth: boolean;
  icon: React.ReactNode;
}

interface ConnectedMarketplace {
  id: number;
  marketplace: Marketplace;
<<<<<<< HEAD
  status: "Active" | "Inactive" | "Pending" | "Failed";
=======
  status: 'Active' | 'Inactive' | 'Pending' | 'Failed';
>>>>>>> b52e6e3 (added demos)
  connectionDate: Date;
  lastLink?: Date;
  fulfillmentModel: string;
  connectionError?: string;
  linkedProducts: number;
  totalProducts: number;
}

interface LinkingProgress {
  total: number;
  completed: number;
  linked: number;
  failed: number;
<<<<<<< HEAD
  errors: Array<{ sku: string; error: string }>;
}

// Demo configuration states
type DemoState =
  | "empty"
  | "products-only"
  | "some-connections"
  | "all-connected"
  | "with-errors";
type ActivePage = "overview" | "marketplace-accounts" | "products" | "orders";

const demoStates = {
  empty: { label: "Empty State", products: [], connections: [] },
  "products-only": {
    label: "Products Imported",
    products: "default",
    connections: [],
  },
  "some-connections": {
    label: "Some Connected",
    products: "default",
    connections: "partial",
  },
  "all-connected": {
    label: "All Connected",
    products: "default",
    connections: "full",
  },
  "with-errors": {
    label: "With Errors",
    products: "default",
    connections: "errors",
  },
};

const sellers: Seller[] = [
  { id: 1, name: "TechStore KSA", email: "contact@techstore.sa" },
  { id: 2, name: "Fashion Hub", email: "info@fashionhub.sa" },
  { id: 3, name: "Home Essentials", email: "sales@homeessentials.sa" },
];

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "marketplace-accounts", label: "Marketplaces", icon: Store },
=======
  errors: Array<{ sku: string; error: string; }>;
}

// Demo configuration states
type DemoState = 'empty' | 'products-only' | 'some-connections' | 'all-connected' | 'with-errors';
type ActivePage = 'overview' | 'marketplace-accounts' | 'products' | 'orders';

const demoStates = {
  empty: { label: 'Empty State', products: [], connections: [] },
  'products-only': { label: 'Products Imported', products: 'default', connections: [] },
  'some-connections': { label: 'Some Connected', products: 'default', connections: 'partial' },
  'all-connected': { label: 'All Connected', products: 'default', connections: 'full' },
  'with-errors': { label: 'With Errors', products: 'default', connections: 'errors' }
};

const sellers: Seller[] = [
  { id: 1, name: 'TechStore KSA', email: 'contact@techstore.sa' },
  { id: 2, name: 'Fashion Hub', email: 'info@fashionhub.sa' },
  { id: 3, name: 'Home Essentials', email: 'sales@homeessentials.sa' }
];

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'marketplace-accounts', label: 'Marketplaces', icon: Store }
>>>>>>> b52e6e3 (added demos)
];

const MarketplaceAccountsPage = () => {
  // Demo configuration
<<<<<<< HEAD
  const [demoState, setDemoState] = useState<DemoState>("empty");
  const [showDemoControls, setShowDemoControls] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>(
    "marketplace-accounts"
  );
=======
  const [demoState, setDemoState] = useState<DemoState>('empty');
  const [showDemoControls, setShowDemoControls] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>('marketplace-accounts');
>>>>>>> b52e6e3 (added demos)
  const [selectedSeller, setSelectedSeller] = useState<Seller>(sellers[0]);
  const [showSellerDropdown, setShowSellerDropdown] = useState(false);

  // State management
  const [products, setProducts] = useState<Product[]>([]);
<<<<<<< HEAD
  const [connectedMarketplaces, setConnectedMarketplaces] = useState<
    ConnectedMarketplace[]
  >([]);
  const [availableMarketplaces, setAvailableMarketplaces] = useState<
    Marketplace[]
  >([]);
  const [showConnectionModal, setShowConnectionModal] =
    useState<Marketplace | null>(null);
  const [linkingProgress, setLinkingProgress] =
    useState<LinkingProgress | null>(null);
=======
  const [connectedMarketplaces, setConnectedMarketplaces] = useState<ConnectedMarketplace[]>([]);
  const [availableMarketplaces, setAvailableMarketplaces] = useState<Marketplace[]>([]);
  const [showConnectionModal, setShowConnectionModal] = useState<Marketplace | null>(null);
  const [linkingProgress, setLinkingProgress] = useState<LinkingProgress | null>(null);
>>>>>>> b52e6e3 (added demos)

  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [relinking, setRelinking] = useState<number | null>(null);
  const [relinked, setRelinked] = useState<number | null>(null);

  // API form states
  const [apiCredentials, setApiCredentials] = useState({
<<<<<<< HEAD
    sellerIdInMarketplace: "",
    apiKey: "",
    apiSecret: "",
=======
    sellerIdInMarketplace: '',
    apiKey: '',
    apiSecret: ''
>>>>>>> b52e6e3 (added demos)
  });

  // CSV template download
  const downloadCSVTemplate = () => {
    const csvContent = `sku,name,nameAR,description,imageUrl,listPrice,inventory
SKU-001,Wireless Bluetooth Headphones,سماعات بلوتوث لاسلكية,High-quality wireless headphones,https://,299,50
SKU-002,Smart Phone Case,حافظة الهاتف الذكي,Protective phone case,https://,89,120`;
<<<<<<< HEAD

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nasam-products-template.csv";
=======
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nasam-products-template.csv';
>>>>>>> b52e6e3 (added demos)
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Demo data configurations
  const getProductsForState = (state: DemoState) => {
<<<<<<< HEAD
    if (state === "empty") return [];
    return [
      {
        id: 1,
        sku: "SKU-001",
        name: "Wireless Bluetooth Headphones",
        price: 299,
        inventory: 50,
      },
      {
        id: 2,
        sku: "SKU-002",
        name: "Smart Phone Case",
        price: 89,
        inventory: 120,
      },
      {
        id: 3,
        sku: "SKU-003",
        name: "USB-C Fast Charger",
        price: 45,
        inventory: 200,
      },
      {
        id: 4,
        sku: "SKU-004",
        name: "Portable Power Bank",
        price: 129,
        inventory: 75,
      },
      {
        id: 5,
        sku: "SKU-005",
        name: "Wireless Mouse",
        price: 59,
        inventory: 95,
      },
=======
    if (state === 'empty') return [];
    return [
      { id: 1, sku: 'SKU-001', name: 'Wireless Bluetooth Headphones', price: 299, inventory: 50 },
      { id: 2, sku: 'SKU-002', name: 'Smart Phone Case', price: 89, inventory: 120 },
      { id: 3, sku: 'SKU-003', name: 'USB-C Fast Charger', price: 45, inventory: 200 },
      { id: 4, sku: 'SKU-004', name: 'Portable Power Bank', price: 129, inventory: 75 },
      { id: 5, sku: 'SKU-005', name: 'Wireless Mouse', price: 59, inventory: 95 }
>>>>>>> b52e6e3 (added demos)
    ];
  };

  const getConnectionsForState = (state: DemoState) => {
    const baseConnections = [
      {
        id: 1,
<<<<<<< HEAD
        marketplace: {
          id: 1,
          name: "Amazon",
          requiresOAuth: true,
          icon: <ShoppingCart className="w-5 h-5" />,
        },
        status: "Active" as const,
        connectionDate: new Date("2024-01-15"),
        lastLink: new Date("2024-01-20"),
        fulfillmentModel: "Seller",
        linkedProducts: 5,
        totalProducts: 5,
      },
      {
        id: 2,
        marketplace: {
          id: 2,
          name: "Trendyol",
          requiresOAuth: false,
          icon: <Store className="w-5 h-5" />,
        },
        status: "Active" as const,
        connectionDate: new Date("2024-01-18"),
        lastLink: new Date("2024-01-19"),
        fulfillmentModel: "Seller",
        linkedProducts: 4,
        totalProducts: 5,
      },
    ];

    switch (state) {
      case "empty":
      case "products-only":
        return [];
      case "some-connections":
        return [baseConnections[0]];
      case "all-connected":
        return baseConnections;
      case "with-errors":
=======
        marketplace: { id: 1, name: 'Amazon', requiresOAuth: true, icon: <ShoppingCart className="w-5 h-5" /> },
        status: 'Active' as const,
        connectionDate: new Date('2024-01-15'),
        lastLink: new Date('2024-01-20'),
        fulfillmentModel: 'Seller',
        linkedProducts: 5,
        totalProducts: 5
      },
      {
        id: 2,
        marketplace: { id: 2, name: 'Trendyol', requiresOAuth: false, icon: <Store className="w-5 h-5" /> },
        status: 'Active' as const,
        connectionDate: new Date('2024-01-18'),
        lastLink: new Date('2024-01-19'),
        fulfillmentModel: 'Seller',
        linkedProducts: 4,
        totalProducts: 5
      }
    ];

    switch (state) {
      case 'empty':
      case 'products-only':
        return [];
      case 'some-connections':
        return [baseConnections[0]];
      case 'all-connected':
        return baseConnections;
      case 'with-errors':
>>>>>>> b52e6e3 (added demos)
        return [
          baseConnections[0],
          {
            ...baseConnections[1],
<<<<<<< HEAD
            status: "Failed" as const,
            lastLink: undefined,
            connectionError: "API credentials expired",
            linkedProducts: 0,
          },
=======
            status: 'Failed' as const,
            lastLink: undefined,
            connectionError: 'API credentials expired',
            linkedProducts: 0
          }
>>>>>>> b52e6e3 (added demos)
        ];
      default:
        return [];
    }
  };

  const getAvailableForState = (state: DemoState) => {
    const allMarketplaces = [
<<<<<<< HEAD
      {
        id: 3,
        name: "Noon",
        requiresOAuth: true,
        icon: <Globe className="w-5 h-5" />,
      },
      {
        id: 4,
        name: "Salla",
        requiresOAuth: false,
        icon: <Package className="w-5 h-5" />,
      },
    ];

    const connectedIds = getConnectionsForState(state).map(
      (c) => c.marketplace.id
    );
    return allMarketplaces
      .concat(
        state === "empty" || state === "products-only"
          ? [
              {
                id: 1,
                name: "Amazon",
                requiresOAuth: true,
                icon: <ShoppingCart className="w-5 h-5" />,
              },
              {
                id: 2,
                name: "Trendyol",
                requiresOAuth: false,
                icon: <Store className="w-5 h-5" />,
              },
            ]
          : []
      )
      .filter((m) => !connectedIds.includes(m.id));
=======
      { id: 3, name: 'Noon', requiresOAuth: true, icon: <Globe className="w-5 h-5" /> },
      { id: 4, name: 'Salla', requiresOAuth: false, icon: <Package className="w-5 h-5" /> }
    ];

    const connectedIds = getConnectionsForState(state).map(c => c.marketplace.id);
    return allMarketplaces.concat(
      state === 'empty' || state === 'products-only' ? [
        { id: 1, name: 'Amazon', requiresOAuth: true, icon: <ShoppingCart className="w-5 h-5" /> },
        { id: 2, name: 'Trendyol', requiresOAuth: false, icon: <Store className="w-5 h-5" /> }
      ] : []
    ).filter(m => !connectedIds.includes(m.id));
>>>>>>> b52e6e3 (added demos)
  };

  // Apply demo state
  useEffect(() => {
    setProducts(getProductsForState(demoState));
    setConnectedMarketplaces(getConnectionsForState(demoState));
    setAvailableMarketplaces(getAvailableForState(demoState));
    setImportResults(null);
  }, [demoState]);

  // Auto-linking after connection
  const performAutoLinking = (newConnection: ConnectedMarketplace) => {
    setLinkingProgress({
      total: products.length,
      completed: 0,
      linked: 0,
      failed: 0,
<<<<<<< HEAD
      errors: [],
=======
      errors: []
>>>>>>> b52e6e3 (added demos)
    });

    let completed = 0;
    const interval = setInterval(() => {
      completed++;
      const shouldFail = Math.random() < 0.2; // 20% failure rate
<<<<<<< HEAD

      setLinkingProgress((prev) =>
        prev
          ? {
              ...prev,
              completed,
              linked: prev.linked + (shouldFail ? 0 : 1),
              failed: prev.failed + (shouldFail ? 1 : 0),
              errors: shouldFail
                ? [
                    ...prev.errors,
                    {
                      sku: `SKU-${completed.toString().padStart(3, "0")}`,
                      error: "No matching listing found",
                    },
                  ]
                : prev.errors,
            }
          : null
      );
=======
      
      setLinkingProgress(prev => prev ? {
        ...prev,
        completed,
        linked: prev.linked + (shouldFail ? 0 : 1),
        failed: prev.failed + (shouldFail ? 1 : 0),
        errors: shouldFail ? 
          [...prev.errors, { sku: `SKU-${completed.toString().padStart(3, '0')}`, error: 'No matching listing found' }] :
          prev.errors
      } : null);
>>>>>>> b52e6e3 (added demos)

      if (completed >= products.length) {
        clearInterval(interval);
        setTimeout(() => {
<<<<<<< HEAD
          const finalLinked =
            products.length - Math.floor(products.length * 0.2);
          setConnectedMarketplaces((prev) =>
            prev.map((m) =>
              m.id === newConnection.id
                ? {
                    ...m,
                    lastLink: new Date(),
                    linkedProducts: finalLinked,
                    totalProducts: products.length,
                  }
                : m
=======
          const finalLinked = products.length - Math.floor(products.length * 0.2);
          setConnectedMarketplaces(prev => 
            prev.map(m => m.id === newConnection.id ? 
              { ...m, lastLink: new Date(), linkedProducts: finalLinked, totalProducts: products.length } : m
>>>>>>> b52e6e3 (added demos)
            )
          );
          setLinkingProgress(null);
        }, 500);
      }
    }, 200);
  };

  // File upload handler
<<<<<<< HEAD
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
=======
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> b52e6e3 (added demos)
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
<<<<<<< HEAD

=======
    
>>>>>>> b52e6e3 (added demos)
    setTimeout(() => {
      const mockResults = {
        summary: { total: 5, created: 5, updated: 0, failed: 0 },
        created: [
<<<<<<< HEAD
          {
            sku: "SKU-001",
            productId: 1,
            name: "Wireless Bluetooth Headphones",
          },
          { sku: "SKU-002", productId: 2, name: "Smart Phone Case" },
          { sku: "SKU-003", productId: 3, name: "USB-C Fast Charger" },
          { sku: "SKU-004", productId: 4, name: "Portable Power Bank" },
          { sku: "SKU-005", productId: 5, name: "Wireless Mouse" },
        ],
        failed: [],
      };

      setImportResults(mockResults);
      setProducts(getProductsForState("products-only"));
      setDemoState("products-only");
=======
          { sku: 'SKU-001', productId: 1, name: 'Wireless Bluetooth Headphones' },
          { sku: 'SKU-002', productId: 2, name: 'Smart Phone Case' },
          { sku: 'SKU-003', productId: 3, name: 'USB-C Fast Charger' },
          { sku: 'SKU-004', productId: 4, name: 'Portable Power Bank' },
          { sku: 'SKU-005', productId: 5, name: 'Wireless Mouse' }
        ],
        failed: []
      };
      
      setImportResults(mockResults);
      setProducts(getProductsForState('products-only'));
      setDemoState('products-only');
>>>>>>> b52e6e3 (added demos)
      setIsImporting(false);
    }, 2000);
  };

  // Connection handlers
  const handleOAuthConnect = (marketplace: Marketplace) => {
    setConnecting(true);
    setTimeout(() => {
      const newConnection: ConnectedMarketplace = {
        id: Date.now(),
        marketplace,
<<<<<<< HEAD
        status: "Active",
        connectionDate: new Date(),
        fulfillmentModel: "Seller",
        linkedProducts: 0,
        totalProducts: products.length,
      };
      setConnectedMarketplaces((prev) => [...prev, newConnection]);
      setAvailableMarketplaces((prev) =>
        prev.filter((m) => m.id !== marketplace.id)
      );
      setShowConnectionModal(null);
      setConnecting(false);

=======
        status: 'Active',
        connectionDate: new Date(),
        fulfillmentModel: 'Seller',
        linkedProducts: 0,
        totalProducts: products.length
      };
      setConnectedMarketplaces(prev => [...prev, newConnection]);
      setAvailableMarketplaces(prev => prev.filter(m => m.id !== marketplace.id));
      setShowConnectionModal(null);
      setConnecting(false);
      
>>>>>>> b52e6e3 (added demos)
      // Auto-link products after connection
      if (products.length > 0) {
        setTimeout(() => performAutoLinking(newConnection), 500);
      }
    }, 1500);
  };

  const handleApiKeyConnect = (marketplace: Marketplace) => {
    setConnecting(true);
    setTimeout(() => {
      const newConnection: ConnectedMarketplace = {
        id: Date.now(),
        marketplace,
<<<<<<< HEAD
        status: "Active",
        connectionDate: new Date(),
        fulfillmentModel: "Seller",
        linkedProducts: 0,
        totalProducts: products.length,
      };
      setConnectedMarketplaces((prev) => [...prev, newConnection]);
      setAvailableMarketplaces((prev) =>
        prev.filter((m) => m.id !== marketplace.id)
      );
      setShowConnectionModal(null);
      setApiCredentials({
        sellerIdInMarketplace: "",
        apiKey: "",
        apiSecret: "",
      });
=======
        status: 'Active',
        connectionDate: new Date(),
        fulfillmentModel: 'Seller',
        linkedProducts: 0,
        totalProducts: products.length
      };
      setConnectedMarketplaces(prev => [...prev, newConnection]);
      setAvailableMarketplaces(prev => prev.filter(m => m.id !== marketplace.id));
      setShowConnectionModal(null);
      setApiCredentials({ sellerIdInMarketplace: '', apiKey: '', apiSecret: '' });
>>>>>>> b52e6e3 (added demos)
      setConnecting(false);

      // Auto-link products after connection
      if (products.length > 0) {
        setTimeout(() => performAutoLinking(newConnection), 500);
      }
    }, 1500);
  };

  // Re-link handler
  const handleReLink = (marketplaceId: number) => {
    setRelinking(marketplaceId);
    setTimeout(() => {
<<<<<<< HEAD
      setConnectedMarketplaces((prev) =>
        prev.map((m) =>
          m.id === marketplaceId ? { ...m, lastLink: new Date() } : m
=======
      setConnectedMarketplaces(prev => 
        prev.map(m => m.id === marketplaceId ? 
          { ...m, lastLink: new Date() } : m
>>>>>>> b52e6e3 (added demos)
        )
      );
      setRelinking(null);
      setRelinked(marketplaceId);
      // Clear the "done" state after 2 seconds
      setTimeout(() => setRelinked(null), 2000);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
<<<<<<< HEAD
      case "Active":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
=======
      case 'Active': return 'bg-green-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Failed': return 'bg-red-500';
      default: return 'bg-gray-500';
>>>>>>> b52e6e3 (added demos)
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
<<<<<<< HEAD
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
=======
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
>>>>>>> b52e6e3 (added demos)
    }
    return date.toLocaleDateString();
  };

<<<<<<< HEAD
  const renderEmptyPage = (
    title: string,
    description: string,
    icon: React.ReactNode
  ) => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div
          className="mx-auto w-12 h-12 flex items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--secondary)" }}
        >
          {icon}
        </div>
        <h3
          className="mt-4 text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
=======
  const renderEmptyPage = (title: string, description: string, icon: React.ReactNode) => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
          {title}
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
>>>>>>> b52e6e3 (added demos)
          {description}
        </p>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activePage) {
<<<<<<< HEAD
      case "overview":
        return renderEmptyPage(
          "Overview Dashboard",
          "Analytics and insights coming soon",
          <BarChart3 className="w-6 h-6" style={{ color: "var(--primary)" }} />
        );
      case "products":
        return renderEmptyPage(
          "Product Management",
          "Manage your product catalog here",
          <Package className="w-6 h-6" style={{ color: "var(--primary)" }} />
        );
      case "orders":
        return renderEmptyPage(
          "Order Management",
          "Track and manage orders from all marketplaces",
          <ShoppingBag
            className="w-6 h-6"
            style={{ color: "var(--primary)" }}
          />
        );
      case "marketplace-accounts":
=======
      case 'overview':
        return renderEmptyPage('Overview Dashboard', 'Analytics and insights coming soon', <BarChart3 className="w-6 h-6" style={{ color: 'var(--primary)' }} />);
      case 'products':
        return renderEmptyPage('Product Management', 'Manage your product catalog here', <Package className="w-6 h-6" style={{ color: 'var(--primary)' }} />);
      case 'orders':
        return renderEmptyPage('Order Management', 'Track and manage orders from all marketplaces', <ShoppingBag className="w-6 h-6" style={{ color: 'var(--primary)' }} />);
      case 'marketplace-accounts':
>>>>>>> b52e6e3 (added demos)
      default:
        return (
          <div>
            {/* Header */}
            <div className="mb-8">
<<<<<<< HEAD
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                Marketplace Accounts
              </h1>
              <p
                className="text-lg"
                style={{ color: "var(--muted-foreground)" }}
              >
                Connect your marketplace accounts to automatically map products
                and enable orders, inventory & pricing sync
              </p>
              <div
                className="mt-4 p-4 rounded-lg"
                style={{ backgroundColor: "var(--muted)" }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="p-1 rounded"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <Package
                      className="w-4 h-4"
                      style={{ color: "var(--accent-foreground)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-medium mb-1"
                      style={{ color: "var(--foreground)" }}
                    >
                      How it works
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      When you connect a marketplace, we automatically create
                      internal mappings between your products and existing
                      marketplace listings using SKU matching. This enables
                      orders, inventory and pricing synchronization without
                      modifying any marketplace data during setup.
=======
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Marketplace Accounts</h1>
              <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
                Connect your marketplace accounts to automatically map products and enable orders, inventory & pricing sync
              </p>
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded" style={{ backgroundColor: 'var(--accent)' }}>
                    <Package className="w-4 h-4" style={{ color: 'var(--accent-foreground)' }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>How it works</h3>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      When you connect a marketplace, we automatically create internal mappings between your products and existing marketplace listings using SKU matching. 
                      This enables orders, inventory and pricing synchronization without modifying any marketplace data during setup.
>>>>>>> b52e6e3 (added demos)
                    </p>
                  </div>
                </div>
              </div>
            </div>
<<<<<<< HEAD

            {/* Managing Products For - Seller Selection */}
            <div
              className="mb-8 p-6 rounded-xl"
              style={{
                backgroundColor: "var(--card)",
                border: "2px solid var(--accent)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Managing Marketplace Accounts For
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    All marketplace connections will be set up for this seller
                    account
                  </p>
                </div>

=======
            
            {/* Managing Products For - Seller Selection */}
            <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: 'var(--card)', border: '2px solid var(--accent)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                    Managing Marketplace Accounts For
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    All marketplace connections will be set up for this seller account
                  </p>
                </div>
                
>>>>>>> b52e6e3 (added demos)
                <div className="relative">
                  <button
                    onClick={() => setShowSellerDropdown(!showSellerDropdown)}
                    className="flex items-center justify-between p-4 rounded-xl transition-colors min-w-80 shadow-sm"
<<<<<<< HEAD
                    style={{
                      backgroundColor: "var(--background)",
                      border: "2px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="p-3 rounded-full"
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        <User
                          className="w-6 h-6"
                          style={{ color: "var(--accent-foreground)" }}
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">
                          {selectedSeller.name}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {selectedSeller.email}
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className="w-5 h-5"
                      style={{ color: "var(--muted-foreground)" }}
                    />
                  </button>

                  {showSellerDropdown && (
                    <div
                      className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl z-20"
                      style={{
                        backgroundColor: "var(--card)",
                        border: "2px solid var(--border)",
                      }}
                    >
=======
                    style={{ backgroundColor: 'var(--background)', border: '2px solid var(--border)', color: 'var(--foreground)' }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--accent)' }}>
                        <User className="w-6 h-6" style={{ color: 'var(--accent-foreground)' }} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">{selectedSeller.name}</div>
                        <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{selectedSeller.email}</div>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                  </button>
                  
                  {showSellerDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl z-20" style={{ backgroundColor: 'var(--card)', border: '2px solid var(--border)' }}>
>>>>>>> b52e6e3 (added demos)
                      {sellers.map((seller) => (
                        <button
                          key={seller.id}
                          onClick={() => {
                            setSelectedSeller(seller);
                            setShowSellerDropdown(false);
                          }}
                          className="w-full flex items-center space-x-4 p-4 hover:opacity-80 transition-opacity text-left border-b last:border-b-0"
<<<<<<< HEAD
                          style={{
                            color: "var(--foreground)",
                            borderColor: "var(--border)",
                          }}
                        >
                          <div
                            className="p-2 rounded-full"
                            style={{ backgroundColor: "var(--secondary)" }}
                          >
                            <User
                              className="w-5 h-5"
                              style={{ color: "var(--foreground)" }}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-base">
                              {seller.name}
                            </div>
                            <div
                              className="text-sm"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              {seller.email}
                            </div>
=======
                          style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}
                        >
                          <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}>
                            <User className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                          </div>
                          <div>
                            <div className="font-semibold text-base">{seller.name}</div>
                            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{seller.email}</div>
>>>>>>> b52e6e3 (added demos)
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Import Section */}
            {products.length === 0 && (
<<<<<<< HEAD
              <div
                className="rounded-xl p-8 mb-8 max-w-2xl mx-auto"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="text-center">
                  <Package
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: "var(--accent)" }}
                  />
                  <h2
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    Import Your Products First
                  </h2>
                  <p
                    className="mb-6 max-w-md mx-auto"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Before connecting marketplaces, import your product catalog
                    to get started. This creates your master product database.
                  </p>

=======
              <div className="rounded-xl p-8 mb-8 max-w-2xl mx-auto" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="text-center">
                  <Package className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                  <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    Import Your Products First
                  </h2>
                  <p className="mb-6 max-w-md mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                    Before connecting marketplaces, import your product catalog to get started. 
                    This creates your master product database.
                  </p>
                  
>>>>>>> b52e6e3 (added demos)
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={downloadCSVTemplate}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
<<<<<<< HEAD
                        style={{
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
                        }}
=======
                        style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
>>>>>>> b52e6e3 (added demos)
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Template</span>
                      </button>
<<<<<<< HEAD

=======
                      
>>>>>>> b52e6e3 (added demos)
                      <label className="relative">
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleFileUpload}
                          className="hidden"
                          disabled={isImporting}
                        />
<<<<<<< HEAD
                        <div
                          className="flex items-center space-x-2 px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          style={{
                            backgroundColor: "var(--primary)",
                            color: "var(--primary-foreground)",
                          }}
=======
                        <div 
                          className="flex items-center space-x-2 px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
>>>>>>> b52e6e3 (added demos)
                        >
                          {isImporting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Upload className="w-5 h-5" />
                          )}
<<<<<<< HEAD
                          <span>
                            {isImporting ? "Importing..." : "Import CSV File"}
                          </span>
                        </div>
                      </label>
                    </div>

                    <p
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Supports CSV format with SKU, name, price, image URL and
                      inventory columns
=======
                          <span>{isImporting ? 'Importing...' : 'Import CSV File'}</span>
                        </div>
                      </label>
                    </div>
                    
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Supports CSV format with SKU, name, price, image URL and inventory columns
>>>>>>> b52e6e3 (added demos)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Import Results */}
            {importResults && (
<<<<<<< HEAD
              <div
                className="rounded-xl p-6 mb-8 max-w-2xl mx-auto"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Check className="w-5 h-5 text-green-500" />
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    Import Complete
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {importResults.summary.created}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Created
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      {importResults.summary.updated}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Updated
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {importResults.summary.failed}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Failed
                    </div>
=======
              <div className="rounded-xl p-6 mb-8 max-w-2xl mx-auto" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="flex items-center space-x-2 mb-4">
                  <Check className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Import Complete</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{importResults.summary.created}</div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{importResults.summary.updated}</div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Updated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{importResults.summary.failed}</div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Failed</div>
>>>>>>> b52e6e3 (added demos)
                  </div>
                </div>
              </div>
            )}

            {/* Connected Marketplaces */}
            {connectedMarketplaces.length > 0 && (
              <div className="mb-8">
<<<<<<< HEAD
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: "var(--foreground)" }}
                >
=======
                <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
>>>>>>> b52e6e3 (added demos)
                  Connected Marketplaces ({connectedMarketplaces.length})
                </h2>
                <div className="flex flex-wrap gap-6">
                  {connectedMarketplaces.map((connection) => (
<<<<<<< HEAD
                    <div
                      key={connection.id}
                      className="rounded-xl p-6 hover:shadow-lg transition-shadow w-80 flex-shrink-0"
                      style={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {/* Marketplace Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: "var(--secondary)" }}
                          >
                            {connection.marketplace.icon}
                          </div>
                          <div>
                            <h3
                              className="font-semibold"
                              style={{ color: "var(--foreground)" }}
                            >
                              {connection.marketplace.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full ${getStatusColor(
                                  connection.status
                                )}`}
                              ></div>
                              <span
                                className={`text-sm ${
                                  connection.status === "Failed"
                                    ? "text-red-600"
                                    : ""
                                }`}
                                style={{
                                  color:
                                    connection.status === "Failed"
                                      ? undefined
                                      : "var(--muted-foreground)",
                                }}
                              >
=======
                    <div key={connection.id} className="rounded-xl p-6 hover:shadow-lg transition-shadow w-80 flex-shrink-0" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                      {/* Marketplace Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
                            {connection.marketplace.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{connection.marketplace.name}</h3>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(connection.status)}`}></div>
                              <span className={`text-sm ${connection.status === 'Failed' ? 'text-red-600' : ''}`} style={{ color: connection.status === 'Failed' ? undefined : 'var(--muted-foreground)' }}>
>>>>>>> b52e6e3 (added demos)
                                {connection.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Linking Status */}
<<<<<<< HEAD
                      <div
                        className="rounded-lg p-3 mb-4"
                        style={{ backgroundColor: "var(--muted)" }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--foreground)" }}
                          >
                            Product Linking
                          </span>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "var(--foreground)" }}
                          >
                            {connection.linkedProducts} linked
                          </span>
                        </div>
                        <p
                          className="text-xs"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          Maps your products to existing marketplace listings
                          (no data modified)
=======
                      <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: 'var(--muted)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Product Linking</span>
                          <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                            {connection.linkedProducts} linked
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                          Maps your products to existing marketplace listings (no data modified)
>>>>>>> b52e6e3 (added demos)
                        </p>
                      </div>

                      {/* Connection Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
<<<<<<< HEAD
                          <span style={{ color: "var(--muted-foreground)" }}>
                            Connected:
                          </span>
                          <span style={{ color: "var(--foreground)" }}>
                            {formatTimeAgo(connection.connectionDate)}
                          </span>
                        </div>
                        {connection.lastLink && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: "var(--muted-foreground)" }}>
                              Last Link:
                            </span>
                            <span style={{ color: "var(--foreground)" }}>
                              {formatTimeAgo(connection.lastLink)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "var(--muted-foreground)" }}>
                            Fulfillment:
                          </span>
                          <span
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              backgroundColor: "var(--secondary)",
                              color: "var(--foreground)",
                            }}
                          >
=======
                          <span style={{ color: 'var(--muted-foreground)' }}>Connected:</span>
                          <span style={{ color: 'var(--foreground)' }}>{formatTimeAgo(connection.connectionDate)}</span>
                        </div>
                        {connection.lastLink && (
                          <div className="flex justify-between text-sm">
                            <span style={{ color: 'var(--muted-foreground)' }}>Last Link:</span>
                            <span style={{ color: 'var(--foreground)' }}>{formatTimeAgo(connection.lastLink)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span style={{ color: 'var(--muted-foreground)' }}>Fulfillment:</span>
                          <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'var(--secondary)', color: 'var(--foreground)' }}>
>>>>>>> b52e6e3 (added demos)
                            {connection.fulfillmentModel}
                          </span>
                        </div>
                      </div>

                      {/* Error Display */}
                      {connection.connectionError && (
<<<<<<< HEAD
                        <div
                          className="rounded-lg p-3 mb-4"
                          style={{
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-700">
                              {connection.connectionError}
                            </span>
=======
                        <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-700">{connection.connectionError}</span>
>>>>>>> b52e6e3 (added demos)
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2">
                        {connection.connectionError ? (
                          <button
<<<<<<< HEAD
                            onClick={() =>
                              setShowConnectionModal(connection.marketplace)
                            }
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                            style={{
                              backgroundColor: "var(--destructive)",
                              color: "white",
=======
                            onClick={() => setShowConnectionModal(connection.marketplace)}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                            style={{ 
                              backgroundColor: 'var(--destructive)', 
                              color: 'white' 
>>>>>>> b52e6e3 (added demos)
                            }}
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>Fix Connection</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReLink(connection.id)}
<<<<<<< HEAD
                            disabled={
                              connection.status !== "Active" ||
                              products.length === 0 ||
                              relinking === connection.id
                            }
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              backgroundColor:
                                relinked === connection.id
                                  ? "var(--accent)"
                                  : "var(--primary)",
                              color:
                                relinked === connection.id
                                  ? "var(--accent-foreground)"
                                  : "var(--primary-foreground)",
=======
                            disabled={connection.status !== 'Active' || products.length === 0 || relinking === connection.id}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ 
                              backgroundColor: relinked === connection.id ? 'var(--accent)' : 'var(--primary)', 
                              color: relinked === connection.id ? 'var(--accent-foreground)' : 'var(--primary-foreground)' 
>>>>>>> b52e6e3 (added demos)
                            }}
                          >
                            {relinking === connection.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : relinked === connection.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <RefreshCw className="w-4 h-4" />
                            )}
                            <span>
<<<<<<< HEAD
                              {relinking === connection.id
                                ? "Re-linking..."
                                : relinked === connection.id
                                ? "Done!"
                                : "Re-link Products"}
=======
                              {relinking === connection.id ? 'Re-linking...' : 
                               relinked === connection.id ? 'Done!' : 'Re-link Products'}
>>>>>>> b52e6e3 (added demos)
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Marketplaces */}
            {availableMarketplaces.length > 0 && products.length > 0 && (
              <div>
<<<<<<< HEAD
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: "var(--foreground)" }}
                >
=======
                <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
>>>>>>> b52e6e3 (added demos)
                  Available Marketplaces
                </h2>
                <div className="flex flex-wrap gap-6">
                  {availableMarketplaces.map((marketplace) => (
<<<<<<< HEAD
                    <div
                      key={marketplace.id}
                      className="rounded-xl p-6 hover:shadow-lg transition-shadow w-80 flex-shrink-0"
                      style={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: "var(--secondary)" }}
                        >
                          {marketplace.icon}
                        </div>
                        <div>
                          <h3
                            className="font-semibold"
                            style={{ color: "var(--foreground)" }}
                          >
                            {marketplace.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {marketplace.requiresOAuth ? (
                              <ExternalLink
                                className="w-4 h-4"
                                style={{ color: "var(--accent)" }}
                              />
                            ) : (
                              <Key
                                className="w-4 h-4"
                                style={{ color: "var(--accent)" }}
                              />
                            )}
                            <span
                              className="text-sm"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              {marketplace.requiresOAuth
                                ? "OAuth Required"
                                : "API Key Required"}
=======
                    <div key={marketplace.id} className="rounded-xl p-6 hover:shadow-lg transition-shadow w-80 flex-shrink-0" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
                          {marketplace.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{marketplace.name}</h3>
                          <div className="flex items-center space-x-2">
                            {marketplace.requiresOAuth ? (
                              <ExternalLink className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                            ) : (
                              <Key className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                            )}
                            <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                              {marketplace.requiresOAuth ? 'OAuth Required' : 'API Key Required'}
>>>>>>> b52e6e3 (added demos)
                            </span>
                          </div>
                        </div>
                      </div>
<<<<<<< HEAD

=======
                      
>>>>>>> b52e6e3 (added demos)
                      <button
                        onClick={() => setShowConnectionModal(marketplace)}
                        disabled={products.length === 0}
                        className="w-full px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
<<<<<<< HEAD
                        style={{
                          backgroundColor: "var(--foreground)",
                          color: "var(--card)",
=======
                        style={{ 
                          backgroundColor: 'var(--foreground)', 
                          color: 'var(--card)' 
>>>>>>> b52e6e3 (added demos)
                        }}
                      >
                        Connect
                      </button>
<<<<<<< HEAD

                      {products.length === 0 && (
                        <p
                          className="text-xs mt-2 text-center"
                          style={{ color: "var(--muted-foreground)" }}
                        >
=======
                      
                      {products.length === 0 && (
                        <p className="text-xs mt-2 text-center" style={{ color: 'var(--muted-foreground)' }}>
>>>>>>> b52e6e3 (added demos)
                          Import products first to connect
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Demo Controls */}
            {showDemoControls && (
<<<<<<< HEAD
              <div
                className="mt-12 rounded-lg p-4"
                style={{
                  backgroundColor: "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Settings
                      className="w-5 h-5"
                      style={{ color: "var(--primary)" }}
                    />
                    <span
                      className="font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      Demo Controls
                    </span>
=======
              <div className="mt-12 rounded-lg p-4" style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Settings className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>Demo Controls</span>
>>>>>>> b52e6e3 (added demos)
                    <div className="flex space-x-2">
                      {Object.entries(demoStates).map(([key, state]) => (
                        <button
                          key={key}
                          onClick={() => setDemoState(key as DemoState)}
                          className="px-3 py-1 rounded text-sm transition-colors"
                          style={{
<<<<<<< HEAD
                            backgroundColor:
                              demoState === key
                                ? "var(--primary)"
                                : "var(--card)",
                            color:
                              demoState === key
                                ? "var(--primary-foreground)"
                                : "var(--foreground)",
                            border: "1px solid var(--border)",
=======
                            backgroundColor: demoState === key ? 'var(--primary)' : 'var(--card)',
                            color: demoState === key ? 'var(--primary-foreground)' : 'var(--foreground)',
                            border: '1px solid var(--border)'
>>>>>>> b52e6e3 (added demos)
                          }}
                        >
                          {state.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDemoControls(false)}
<<<<<<< HEAD
                    style={{ color: "var(--primary)" }}
=======
                    style={{ color: 'var(--primary)' }}
>>>>>>> b52e6e3 (added demos)
                    className="hover:opacity-80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <>
      <style>{cssVariables}</style>
<<<<<<< HEAD
      <div
        className="min-h-screen flex"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6">
            <div className="max-w-6xl">{renderMainContent()}</div>
=======
      <div className="min-h-screen flex" style={{ backgroundColor: 'var(--background)' }}>
    

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6">
            <div className="max-w-6xl">
              {renderMainContent()}
            </div>
>>>>>>> b52e6e3 (added demos)
          </div>
        </div>

        {/* Auto-linking Progress Modal */}
        {linkingProgress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
<<<<<<< HEAD
            <div
              className="rounded-xl max-w-md w-full p-6"
              style={{ backgroundColor: "var(--card)" }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                Linking Products...
              </h3>

              <div className="space-y-4">
                <div
                  className="w-full rounded-full h-3"
                  style={{ backgroundColor: "var(--secondary)" }}
                >
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: "var(--accent)",
                      width: `${
                        (linkingProgress.completed / linkingProgress.total) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {linkingProgress.completed}/{linkingProgress.total}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Products processed
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      {linkingProgress.linked}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Linked
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">
                      {linkingProgress.failed}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Failed
                    </div>
                  </div>
                </div>

                <p
                  className="text-xs text-center"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Creating internal mappings between your products and
                  marketplace listings
=======
            <div className="rounded-xl max-w-md w-full p-6" style={{ backgroundColor: 'var(--card)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Linking Products...
              </h3>
              
              <div className="space-y-4">
                <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--secondary)' }}>
                  <div 
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--accent)',
                      width: `${(linkingProgress.completed / linkingProgress.total) * 100}%` 
                    }}
                  ></div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                    {linkingProgress.completed}/{linkingProgress.total}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Products processed</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{linkingProgress.linked}</div>
                    <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Linked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">{linkingProgress.failed}</div>
                    <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Failed</div>
                  </div>
                </div>
                
                <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
                  Creating internal mappings between your products and marketplace listings
>>>>>>> b52e6e3 (added demos)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Connection Modal */}
        {showConnectionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
<<<<<<< HEAD
            <div
              className="rounded-xl max-w-md w-full p-6"
              style={{ backgroundColor: "var(--card)" }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                Connect to {showConnectionModal.name}
              </h3>

              {showConnectionModal.requiresOAuth ? (
                <div className="space-y-4">
                  <p style={{ color: "var(--muted-foreground)" }}>
                    You'll be redirected to {showConnectionModal.name} to
                    authorize the connection. Make sure you have admin access to
                    your seller account.
                  </p>
                  <div className="space-y-3">
                    <div
                      className="rounded-lg p-3"
                      style={{ backgroundColor: "var(--muted)" }}
                    >
                      <p
                        className="text-sm"
                        style={{ color: "var(--foreground)" }}
                      >
                        <strong>What happens next:</strong>
                      </p>
                      <ul
                        className="text-sm mt-2 space-y-1"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        <li>• Connect your marketplace account</li>
                        <li>
                          • Automatically link {products.length} products to
                          existing listings
                        </li>
=======
            <div className="rounded-xl max-w-md w-full p-6" style={{ backgroundColor: 'var(--card)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Connect to {showConnectionModal.name}
              </h3>
              
              {showConnectionModal.requiresOAuth ? (
                <div className="space-y-4">
                  <p style={{ color: 'var(--muted-foreground)' }}>
                    You'll be redirected to {showConnectionModal.name} to authorize the connection. 
                    Make sure you have admin access to your seller account.
                  </p>
                  <div className="space-y-3">
                    <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--muted)' }}>
                      <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                        <strong>What happens next:</strong>
                      </p>
                      <ul className="text-sm mt-2 space-y-1" style={{ color: 'var(--muted-foreground)' }}>
                        <li>• Connect your marketplace account</li>
                        <li>• Automatically link {products.length} products to existing listings</li>
>>>>>>> b52e6e3 (added demos)
                        <li>• No marketplace data will be modified</li>
                      </ul>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowConnectionModal(null)}
                        className="flex-1 px-4 py-2 rounded-lg hover:opacity-80"
<<<<<<< HEAD
                        style={{
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
                        }}
=======
                        style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
>>>>>>> b52e6e3 (added demos)
                        disabled={connecting}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleOAuthConnect(showConnectionModal)}
                        disabled={connecting}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:opacity-90"
<<<<<<< HEAD
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)",
                        }}
=======
                        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
>>>>>>> b52e6e3 (added demos)
                      >
                        {connecting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
<<<<<<< HEAD
                        <span>
                          {connecting
                            ? "Connecting..."
                            : `Continue to ${showConnectionModal.name}`}
                        </span>
=======
                        <span>{connecting ? 'Connecting...' : `Continue to ${showConnectionModal.name}`}</span>
>>>>>>> b52e6e3 (added demos)
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
<<<<<<< HEAD
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "var(--foreground)" }}
                      >
=======
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
>>>>>>> b52e6e3 (added demos)
                        Seller ID in {showConnectionModal.name}
                      </label>
                      <input
                        type="text"
                        value={apiCredentials.sellerIdInMarketplace}
<<<<<<< HEAD
                        onChange={(e) =>
                          setApiCredentials((prev) => ({
                            ...prev,
                            sellerIdInMarketplace: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50"
                        style={{
                          backgroundColor: "var(--input)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
=======
                        onChange={(e) => setApiCredentials(prev => ({ ...prev, sellerIdInMarketplace: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50"
                        style={{ 
                          backgroundColor: 'var(--input)', 
                          border: '1px solid var(--border)',
                          color: 'var(--foreground)'
>>>>>>> b52e6e3 (added demos)
                        }}
                        placeholder="Your seller ID"
                      />
                    </div>
                    <div>
<<<<<<< HEAD
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "var(--foreground)" }}
                      >
=======
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
>>>>>>> b52e6e3 (added demos)
                        API Key
                      </label>
                      <input
                        type="text"
                        value={apiCredentials.apiKey}
<<<<<<< HEAD
                        onChange={(e) =>
                          setApiCredentials((prev) => ({
                            ...prev,
                            apiKey: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50"
                        style={{
                          backgroundColor: "var(--input)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
=======
                        onChange={(e) => setApiCredentials(prev => ({ ...prev, apiKey: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50"
                        style={{ 
                          backgroundColor: 'var(--input)', 
                          border: '1px solid var(--border)',
                          color: 'var(--foreground)'
>>>>>>> b52e6e3 (added demos)
                        }}
                        placeholder="Your API key"
                      />
                    </div>
                    <div>
<<<<<<< HEAD
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "var(--foreground)" }}
                      >
=======
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
>>>>>>> b52e6e3 (added demos)
                        API Secret
                      </label>
                      <input
                        type="password"
                        value={apiCredentials.apiSecret}
<<<<<<< HEAD
                        onChange={(e) =>
                          setApiCredentials((prev) => ({
                            ...prev,
                            apiSecret: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50"
                        style={{
                          backgroundColor: "var(--input)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
=======
                        onChange={(e) => setApiCredentials(prev => ({ ...prev, apiSecret: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50"
                        style={{ 
                          backgroundColor: 'var(--input)', 
                          border: '1px solid var(--border)',
                          color: 'var(--foreground)'
>>>>>>> b52e6e3 (added demos)
                        }}
                        placeholder="Your API secret"
                      />
                    </div>
                  </div>
<<<<<<< HEAD

                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "var(--muted)" }}
                  >
                    <p
                      className="text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      <strong>After connection:</strong>
                    </p>
                    <ul
                      className="text-sm mt-2 space-y-1"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <li>
                        • Automatically link {products.length} products to
                        existing listings
                      </li>
=======
                  
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--muted)' }}>
                    <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                      <strong>After connection:</strong>
                    </p>
                    <ul className="text-sm mt-2 space-y-1" style={{ color: 'var(--muted-foreground)' }}>
                      <li>• Automatically link {products.length} products to existing listings</li>
>>>>>>> b52e6e3 (added demos)
                      <li>• No marketplace data will be modified</li>
                      <li>• Ready for orders, inventory and pricing sync</li>
                    </ul>
                  </div>
<<<<<<< HEAD

=======
                  
>>>>>>> b52e6e3 (added demos)
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowConnectionModal(null)}
                      className="flex-1 px-4 py-2 rounded-lg hover:opacity-80"
<<<<<<< HEAD
                      style={{
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                      }}
=======
                      style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
>>>>>>> b52e6e3 (added demos)
                      disabled={connecting}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleApiKeyConnect(showConnectionModal)}
<<<<<<< HEAD
                      disabled={
                        connecting ||
                        !apiCredentials.sellerIdInMarketplace ||
                        !apiCredentials.apiKey ||
                        !apiCredentials.apiSecret
                      }
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--primary-foreground)",
                      }}
=======
                      disabled={connecting || !apiCredentials.sellerIdInMarketplace || !apiCredentials.apiKey || !apiCredentials.apiSecret}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
>>>>>>> b52e6e3 (added demos)
                    >
                      {connecting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Key className="w-4 h-4" />
                      )}
<<<<<<< HEAD
                      <span>
                        {connecting
                          ? "Connecting..."
                          : "Connect & Link Products"}
                      </span>
=======
                      <span>{connecting ? 'Connecting...' : 'Connect & Link Products'}</span>
>>>>>>> b52e6e3 (added demos)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!showDemoControls && (
          <button
            onClick={() => setShowDemoControls(true)}
            className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg hover:opacity-90"
<<<<<<< HEAD
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
=======
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
>>>>>>> b52e6e3 (added demos)
          >
            <Settings className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
};

<<<<<<< HEAD
export default MarketplaceAccountsPage;
=======
export default MarketplaceAccountsPage;
>>>>>>> b52e6e3 (added demos)
