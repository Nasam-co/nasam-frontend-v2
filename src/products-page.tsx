import React, { useState, useEffect } from 'react';
import { Upload, Package, X, Loader2, RotateCcw, User, ChevronDown, Settings, BarChart3, Store, ShoppingBag, Plus, Edit3, UserPlus, TrendingUp } from 'lucide-react';

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

/* Resizable table columns */
.resize-x {
  resize: horizontal;
  overflow: auto;
  position: relative;
}

.resize-x::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 4px;
  cursor: col-resize;
  background: transparent;
}

.resize-x:hover::after {
  background: var(--border);
}
`;

interface MarketplaceListing {
  id: number;
  marketplace: string;
  marketplaceIcon: string;
  listPrice: number;
  salePrice?: number;
  stock: number;
  syncStatus: 'success' | 'pending' | 'failed';
  lastSyncAt: Date;
  failureReason?: string;
  isListed: boolean;
}

interface Product {
  id: number;
  sku: string;
  name: string;
  imageUrl?: string;
  masterPrice: number;
  masterStock: number;
  totalUnitsSold: number;
  totalRevenue: number;
  lastUpdated: Date;
  seller: {
    id: number;
    name: string;
  };
  listings: MarketplaceListing[];
}

interface Seller {
  id: number;
  name: string;
  email: string;
}

interface ImportProgress {
  step: 'processing' | 'linking' | 'syncing' | 'complete';
  currentMarketplace?: string;
  processed: number;
  total: number;
  linked: number;
  synced: { [marketplace: string]: number };
  failed: { [marketplace: string]: number };
  errors: Array<{ sku: string; marketplace: string; error: string }>;
}

interface EditingState {
  [key: string]: {
    listPrice?: number;
    salePrice?: number;
    stock?: number;
  };
}

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

type DemoState = 'empty' | 'single-seller' | 'multi-seller';
type ModalType = 'import' | 'quick-updates' | null;
type ImportScenario = 'new-seller' | 'existing-seller';

const sellers: Seller[] = [
  { id: 1, name: 'TechStore KSA', email: 'contact@techstore.sa' },
  { id: 2, name: 'Fashion Hub', email: 'info@fashionhub.sa' },
  { id: 3, name: 'Home Essentials', email: 'sales@homeessentials.sa' }
];

const demoStates = {
  empty: { label: 'No Products' },
  'single-seller': { label: 'Single Seller' },
  'multi-seller': { label: 'Multiple Sellers' }
};

// Marketplace Pricing Component
const MarketplacePricing = ({ product, listing, editingState, onEdit }: {
  product: Product;
  listing: MarketplaceListing;
  editingState: EditingState;
  onEdit: (productId: number, listingId: number, field: 'listPrice' | 'salePrice' | 'stock', value: number) => void;
}) => {
  const key = `${product.id}-${listing.id}`;
  const edits = editingState[key];
  
  const currentListPrice = edits?.listPrice ?? listing.listPrice;
  const currentSalePrice = edits?.salePrice ?? listing.salePrice;
  
  const statusColor = listing.syncStatus === 'success' ? '#10b981' : 
                     listing.syncStatus === 'pending' ? '#f59e0b' : 
                     listing.syncStatus === 'failed' ? '#ef4444' : '#6b7280';

  const statusLabel = listing.syncStatus === 'success' ? 'Synced' : 
                     listing.syncStatus === 'pending' ? 'Pending' : 
                     listing.syncStatus === 'failed' ? 'Failed' : 'Unknown';

  return (
    <div className="p-3 rounded-lg border mb-2" style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)' }}>
      {/* Marketplace Header - Fixed layout */}
      <div className="flex items-center justify-between mb-3 min-h-[20px]">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <img 
            src={listing.marketplaceIcon} 
            alt={listing.marketplace}
            className="w-5 h-5 object-contain flex-shrink-0"
          />
          <span className="font-medium text-sm truncate" style={{ color: 'var(--foreground)' }}>
            {listing.marketplace}
          </span>
        </div>
        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColor }}
          ></div>
 <span
  className="relative text-xs whitespace-nowrap"
  style={{ color: statusColor }}
  onMouseEnter={(e) => {
    const tooltip = document.createElement('div');
    tooltip.textContent =
      listing.syncStatus === 'failed'
        ? (listing.failureReason || 'Sync failed - unknown error')
        : `Last synced: ${
            listing.lastSyncAt
              ? new Date(listing.lastSyncAt).toLocaleTimeString()
              : 'Unknown'
          }`;
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '100%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.background = '#000';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '4px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    tooltip.className = 'custom-tooltip';
    e.currentTarget.appendChild(tooltip);
  }}
  onMouseLeave={(e) => {
    const tooltip = e.currentTarget.querySelector('.custom-tooltip');
    if (tooltip) tooltip.remove();
  }}
>
  {statusLabel}
</span>


        </div>
      </div>

      {/* Pricing Fields */}
      <div className="space-y-3">
        {/* List Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium w-8 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>List:</span>
          <input
            type="number"
            value={currentListPrice}
            onChange={(e) => onEdit(product.id, listing.id, 'listPrice', parseFloat(e.target.value) || 0)}
            className="w-20 px-2 py-1 text-xs rounded border"
            style={{ border: '1px solid var(--border)', color: 'var(--primary)' }}
            placeholder="SAR"
          />
        </div>

        {/* Sale Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium w-8 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>Sale:</span>
          <input
            type="number"
            value={currentSalePrice || ''}
            onChange={(e) => onEdit(product.id, listing.id, 'salePrice', parseFloat(e.target.value) || 0)}
            className="w-20 px-2 py-1 text-xs rounded border"
            style={{ 
              border: '1px solid var(--border)', 
              color: currentSalePrice ? 'var(--primary)' : 'var(--muted-foreground)' 
            }}
            placeholder="Optional"
          />
        </div>
      </div>
    </div>
  );
};

// Marketplace Stock Component
const MarketplaceStock = ({ product, listing, editingState, onEdit }: {
  product: Product;
  listing: MarketplaceListing;
  editingState: EditingState;
  onEdit: (productId: number, listingId: number, field: 'listPrice' | 'salePrice' | 'stock', value: number) => void;
}) => {
  const key = `${product.id}-${listing.id}`;
  const edits = editingState[key];
  const currentStock = edits?.stock ?? listing.stock;
  
  const statusColor = listing.syncStatus === 'success' ? '#10b981' : 
                     listing.syncStatus === 'pending' ? '#f59e0b' : 
                     listing.syncStatus === 'failed' ? '#ef4444' : '#6b7280';

  const statusLabel = listing.syncStatus === 'success' ? 'Synced' : 
                     listing.syncStatus === 'pending' ? 'Pending' : 
                     listing.syncStatus === 'failed' ? 'Failed' : 'Unknown';

  return (
    <div className="p-3 rounded-lg border mb-2" style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)' }}>
      {/* Marketplace Header - Fixed layout */}
      <div className="flex items-center justify-between mb-3 min-h-[20px]">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <img 
            src={listing.marketplaceIcon} 
            alt={listing.marketplace}
            className="w-5 h-5 object-contain flex-shrink-0"
          />
          <span className="font-medium text-sm truncate" style={{ color: 'var(--foreground)' }}>
            {listing.marketplace}
          </span>
        </div>
        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColor }}
          ></div>
          <span
  className="relative text-xs whitespace-nowrap"
  style={{ color: statusColor }}
  onMouseEnter={(e) => {
    const tooltip = document.createElement('div');
    tooltip.textContent =
      listing.syncStatus === 'failed'
        ? (listing.failureReason || 'Sync failed - unknown error')
        : `Last synced: ${
            listing.lastSyncAt
              ? new Date(listing.lastSyncAt).toLocaleTimeString()
              : 'Unknown'
          }`;
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '100%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.background = '#000';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '4px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    tooltip.className = 'custom-tooltip';
    e.currentTarget.appendChild(tooltip);
  }}
  onMouseLeave={(e) => {
    const tooltip = e.currentTarget.querySelector('.custom-tooltip');
    if (tooltip) tooltip.remove();
  }}
>
  {statusLabel}
</span>

        </div>
      </div>

      {/* Stock Field with padding to match pricing component height */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium w-12 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>Stock:</span>
          <input
            type="number"
            value={currentStock}
            onChange={(e) => onEdit(product.id, listing.id, 'stock', parseInt(e.target.value) || 0)}
            className="w-20 px-2 py-1 text-xs rounded border"
            style={{ border: '1px solid var(--border)', color: 'var(--primary)' }}
            placeholder="Units"
          />
        </div>
        {/* Spacer to match pricing component height */}
        <div style={{ height: '32px' }}></div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  // Demo and navigation state
  const [demoState, setDemoState] = useState<DemoState>('empty');
  const [importScenario, setImportScenario] = useState<ImportScenario>('new-seller');
  const [showDemoControls, setShowDemoControls] = useState(true);

  const [selectedSellers, setSelectedSellers] = useState<Seller[]>([sellers[0]]);

  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  
  // Editing state
  const [editingState, setEditingState] = useState<EditingState>({});
  const [isSaving, setIsSaving] = useState(false);
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  });
  
  // Sorting state
  const [sortField, setSortField] = useState<'masterStock' | 'totalUnitsSold' | 'totalRevenue' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Modal state
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedSellerForImport, setSelectedSellerForImport] = useState<Seller>(sellers[0]);
  const [showImportSellerDropdown, setShowImportSellerDropdown] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress | null>(null);
  const [importResults, setImportResults] = useState<any>(null);

  // Demo data
  const getProductsForState = (state: DemoState) => {
    if (state === 'empty') return [];
    
    const createMarketplaceListings = (basePrice: number, includeListings: boolean = true): MarketplaceListing[] => {
      const listings = [
        {
          id: 1,
          marketplace: 'Amazon',
          marketplaceIcon: 'https://tinuiti.com/wp-content/uploads/2020/07/amazon-1-1.png',
          listPrice: basePrice,
          salePrice: Math.random() > 0.5 ? Math.floor(basePrice * 0.85) : undefined,
          stock: Math.floor(Math.random() * 100) + 10,
          syncStatus: Math.random() > 0.7 ? 'failed' : 'success',
          lastSyncAt: new Date(),
          failureReason: Math.random() > 0.7 ? 'API rate limit exceeded - please try again later' : undefined,
          isListed: includeListings
        },
        {
          id: 2,
          marketplace: 'Trendyol',
          marketplaceIcon: 'https://d22nihcmq83fqg.cloudfront.net/sites/default/files/styles/icon_image/public/store_icon/trendyol-logo-en-arabiccoupon-trendyol-coupons-and-promo-codes-400x400.jpg',
          listPrice: basePrice,
          salePrice: undefined,
          stock: Math.floor(Math.random() * 80) + 5,
          syncStatus: Math.random() > 0.8 ? 'failed' : Math.random() > 0.9 ? 'pending' : 'success',
          lastSyncAt: new Date(),
          failureReason: Math.random() > 0.8 ? 'Authentication failed - invalid credentials' : undefined,
          isListed: includeListings
        }
      ];
      
      return listings.map(listing => ({
        ...listing,
        syncStatus: listing.syncStatus as 'success' | 'pending' | 'failed'
      }));
    };
    
    const baseProducts = [
      { 
        id: 1, 
        sku: 'TECH-001', 
        name: 'Wireless Bluetooth Headphones',
        masterPrice: 299,
        masterStock: 145,
        imageUrl: 'https://getsunmed.com/cdn/shop/products/BeyondGummies-1-1-1-FS-750mg-30count.jpg?v=1680209565',
        totalUnitsSold: 127,
        totalRevenue: 37973,
        lastUpdated: new Date('2024-01-20'), 
        seller: sellers[0],
        listings: createMarketplaceListings(299, true)
      },
      { 
        id: 2, 
        sku: 'TECH-002', 
        name: 'Smart Phone Case',
        masterPrice: 89,
        masterStock: 275,
        imageUrl: 'https://getsunmed.com/cdn/shop/products/BeyondGummies-1-1-1-FS-750mg-30count.jpg?v=1680209565',
        totalUnitsSold: 89,
        totalRevenue: 7921,
        lastUpdated: new Date('2024-01-19'), 
        seller: sellers[0],
        listings: []
      },
      { 
        id: 3, 
        sku: 'TECH-003', 
        name: 'USB-C Fast Charger',
        masterPrice: 45,
        masterStock: 312,
        imageUrl: 'https://getsunmed.com/cdn/shop/products/BeyondGummies-1-1-1-FS-750mg-30count.jpg?v=1680209565',
        totalUnitsSold: 234,
        totalRevenue: 10530,
        lastUpdated: new Date('2024-01-18'), 
        seller: sellers[0],
        listings: createMarketplaceListings(45, true)
      }
    ];

    if (state === 'multi-seller') {
      return [
        ...baseProducts,
        { 
          id: 4, 
          sku: 'FASH-001', 
          name: 'Cotton T-Shirt',
          masterPrice: 79,
          masterStock: 625,
          imageUrl: 'https://getsunmed.com/cdn/shop/products/BeyondGummies-1-1-1-FS-750mg-30count.jpg?v=1680209565',
          totalUnitsSold: 445,
          totalRevenue: 35155,
          lastUpdated: new Date('2024-01-17'), 
          seller: sellers[1],
          listings: createMarketplaceListings(79, true)
        },
        { 
          id: 5, 
          sku: 'FASH-002', 
          name: 'Denim Jeans',
          masterPrice: 199,
          masterStock: 287,
          imageUrl: 'https://getsunmed.com/cdn/shop/products/BeyondGummies-1-1-1-FS-750mg-30count.jpg?v=1680209565',
          totalUnitsSold: 156,
          totalRevenue: 31044,
          lastUpdated: new Date('2024-01-16'), 
          seller: sellers[1],
          listings: createMarketplaceListings(199, true)
        },
        { 
          id: 6, 
          sku: 'HOME-001', 
          name: 'Ceramic Coffee Mug',
          masterPrice: 35,
          masterStock: 723,
          imageUrl: 'https://getsunmed.com/cdn/shop/products/BeyondGummies-1-1-1-FS-750mg-30count.jpg?v=1680209565',
          totalUnitsSold: 789,
          totalRevenue: 27615,
          lastUpdated: new Date('2024-01-15'), 
          seller: sellers[2],
          listings: createMarketplaceListings(35, true)
        },
        { 
          id: 7, 
          sku: 'HOME-002', 
          name: 'Kitchen Towel Set',
          masterPrice: 25,
          masterStock: 434,
          imageUrl: 'https://getsunmed.com/cdn/shop/products/BeyondGummies-1-1-1-FS-750mg-30count.jpg?v=1680209565',
          totalUnitsSold: 234,
          totalRevenue: 5850,
          lastUpdated: new Date('2024-01-14'), 
          seller: sellers[2],
          listings: []
        }
      ];
    }

    return baseProducts;
  };

  useEffect(() => {
    const newProducts = getProductsForState(demoState);
    setProducts(newProducts);
    setPagination(prev => ({ ...prev, totalItems: newProducts.length }));
    
    // Auto-select all sellers if multi-seller demo
    if (demoState === 'multi-seller') {
      setSelectedSellers(sellers);
    } else if (demoState === 'single-seller') {
      setSelectedSellers([sellers[0]]);
    }
  }, [demoState]);

  const getProductStatus = (product: Product) => {
    if (product.listings.length === 0) return 'success'; // No listings means no sync issues
    
    const listedListings = product.listings.filter(l => l.isListed);
    if (listedListings.length === 0) return 'success';
    
    const failedCount = listedListings.filter(l => l.syncStatus === 'failed').length;
    const pendingCount = listedListings.filter(l => l.syncStatus === 'pending').length;
    
    if (failedCount === listedListings.length) return 'failed';
    if (failedCount > 0 || pendingCount > 0) return 'partial';
    return 'success';
  };

  const hasAnyListings = (product: Product) => {
    return product.listings.length > 0;
  };

  const handleSort = (field: 'masterStock' | 'totalUnitsSold' | 'totalRevenue') => {
    const newDirection = sortField === field && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  const sortedAndFilteredProducts = () => {
    const filtered = products.filter(product => 
      selectedSellers.some(seller => seller.id === product.seller.id)
    );

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortField) {
          case 'masterStock':
            aValue = a.masterStock;
            bValue = b.masterStock;
            break;
          case 'totalUnitsSold':
            aValue = a.totalUnitsSold;
            bValue = b.totalUnitsSold;
            break;
          case 'totalRevenue':
            aValue = a.totalRevenue;
            bValue = b.totalRevenue;
            break;
          default:
            return 0;
        }
        
        return sortDirection === 'desc' ? bValue - aValue : aValue - bValue;
      });
    }

    return filtered;
  };

  const paginatedProducts = () => {
    const sorted = sortedAndFilteredProducts();
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    return sorted.slice(startIndex, startIndex + pagination.pageSize);
  };

  const handleEdit = (productId: number, listingId: number, field: 'listPrice' | 'salePrice' | 'stock', value: number) => {
    const key = `${productId}-${listingId}`;
    setEditingState(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const hasUnsavedChanges = Object.keys(editingState).length > 0;

  const handleRefresh = () => {
    // Simulate data refresh - in real app, this would call your API
    const refreshedProducts = getProductsForState(demoState);
    setProducts(refreshedProducts);
    setEditingState({}); // Clear any pending edits
    
    // Show a brief loading state
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    // Update product listings with pending status
    const updatedProducts = products.map(product => ({
      ...product,
      listings: product.listings.map(listing => {
        const key = `${product.id}-${listing.id}`;
        const edits = editingState[key];

        if (edits) {
          return {
            ...listing,
            listPrice: edits.listPrice ?? listing.listPrice,
            salePrice: edits.salePrice ?? listing.salePrice,
            stock: edits.stock ?? listing.stock,
            syncStatus: 'pending' as const,
          };
        }
        return listing;
      }),
    }));

    setProducts(updatedProducts);
    setEditingState({});

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // In real implementation, would refresh data or handle sync results
    }, 2000);
  };

  // CSV template download
  const downloadCSVTemplate = (type: 'full' | 'bulk') => {
    let csvContent = '';
    
    if (type === 'full') {
      csvContent = `sku,name,nameAR,description,price,inventory
TECH-001,Wireless Bluetooth Headphones,سماعات بلوتوث لاسلكية,High-quality wireless headphones,299,50
FASH-001,Cotton T-Shirt,قميص قطني,Comfortable cotton t-shirt,79,300
HOME-001,Ceramic Coffee Mug,كوب قهوة سيراميك,Beautiful ceramic mug,35,500`;
    } else {
      csvContent = `sku,listPrice,salePrice,inventory
TECH-001,249,220,45
FASH-001,59,59,280
HOME-001,29,29,480`;
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = type === 'full' ? 'nasam-products-template.csv' : 'nasam-bulk-update-template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Smart import handler
  const handleSmartImport = async (event: React.ChangeEvent<HTMLInputElement>, type: 'import' | 'quick-updates') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    
    // Simulate smart processing
    setImportProgress({
      step: 'processing',
      processed: 0,
      total: type === 'quick-updates' ? 12 : 5,
      linked: 0,
      synced: {},
      failed: {},
      errors: []
    });

    // Simulate progress
    let processed = 0;
    const totalItems = type === 'quick-updates' ? 12 : 5;
    const processingInterval = setInterval(() => {
      processed++;
      setImportProgress(prev => prev ? { ...prev, processed } : null);
      
      if (processed >= totalItems) {
        clearInterval(processingInterval);
        
        setTimeout(() => {
          if (type === 'quick-updates') {
            // Quick updates - just processing
            setImportResults({
              type: 'quick-updates',
              summary: { 
                processed: totalItems, 
                updated: totalItems - 1, 
                failed: 1,
                affectedSellers: 3
              },
              message: 'Price and inventory updates applied across all sellers',
              details: 'Changes automatically synced to connected marketplaces'
            });
          } else {
            // Import - includes marketplace setup for new sellers
            setImportResults({
              type: 'import',
              summary: { 
                processed: totalItems, 
                created: totalItems, 
                failed: 0 
              },
              seller: selectedSellerForImport.name,
              scenario: importScenario,
              message: importScenario === 'new-seller' 
                ? 'Products imported successfully for new seller'
                : 'Products imported and linked to existing marketplaces',
              nextStep: importScenario === 'new-seller' ? 'marketplace-setup' : null
            });
          }
          
          setImportProgress(null);
          setIsImporting(false);
          
          // Update demo data
          if (demoState === 'empty') {
            setDemoState('single-seller');
          }
        }, 1000);
      }
    }, 150);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const filteredProducts = sortedAndFilteredProducts();
  const displayedProducts = paginatedProducts();

  const totalPages = Math.ceil(filteredProducts.length / pagination.pageSize);

  return (
    <>
      <style>{cssVariables}</style>
      <div className="min-h-screen flex" style={{ backgroundColor: 'var(--background)' }}>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6">
            <div className="max-w-7xl">
              <div>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Products</h1>
                      <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
                        Manage products across all your seller accounts
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      {/* Primary: Bulk Updates (most frequent) */}
                      <button
                        onClick={() => setActiveModal('quick-updates')}
                        disabled={false}
                        className="flex items-center space-x-2 px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      >
                        <TrendingUp className="w-5 h-5" />
                        <span>Bulk & Quick Updates</span>
                      </button>
                      
                      {/* Secondary: Import Products */}
                      <button
                        onClick={() => setActiveModal('import')}
                        className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                      >
                        <Plus className="w-5 h-5" />
                        <span>Import Products</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Table */}
                <div className="rounded-xl" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                  <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                      Product Catalog ({filteredProducts.length} products)
                    </h3>
                    
                    <div className="flex items-center space-x-3">
                      {/* Refresh Button - Icon Only */}
                      <button
                        onClick={handleRefresh}
                        disabled={isSaving}
                        className="flex items-center justify-center p-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                        title={isSaving ? 'Refreshing...' : 'Refresh'}
                      >
                        <RotateCcw className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
                      </button>
                      
                      {/* Global Save All Changes Button */}
                      {hasUnsavedChanges && (
                        <>
                          <button
                            onClick={handleSaveAll}
                            disabled={isSaving}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                          >
                            {isSaving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <RotateCcw className="w-4 h-4" />
                            )}
                            <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
                          </button>
                          
                          <button
                            onClick={() => setEditingState({})}
                            disabled={isSaving}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                            style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel All</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {displayedProducts.length === 0 ? (
                    /* Empty Table State */
                    <div className="text-center py-16">
                      <Package className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted-foreground)' }} />
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                        No Products Found
                      </h3>
                      <p className="mb-6 max-w-md mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                        {products.length === 0 
                          ? 'Get started by importing products for any of your sellers'
                          : 'No products match your current filter. Try selecting different sellers or adjusting your criteria.'
                        }
                      </p>
                      
                      {products.length === 0 && (
                        <button
                          onClick={() => setActiveModal('import')}
                          className="flex items-center space-x-2 px-6 py-3 rounded-lg hover:opacity-90 transition-opacity mx-auto"
                          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                        >
                          <Plus className="w-5 h-5" />
                          <span>Import Products</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Products Table with resizable columns */}
                      <div className="overflow-x-auto">
                        <table className="w-full" style={{ tableLayout: 'auto', minWidth: '1400px' }}>
                          <thead>
                            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                              <th className="text-left p-4 font-medium resize-x" style={{ color: 'var(--muted-foreground)', width: '80px', minWidth: '60px' }}>Image</th>
                              <th className="text-left p-4 font-medium resize-x" style={{ color: 'var(--muted-foreground)', width: '120px', minWidth: '100px' }}>SKU</th>
                              <th className="text-left p-4 font-medium resize-x" style={{ color: 'var(--muted-foreground)', width: '200px', minWidth: '150px' }}>Product Name</th>
                              <th className="text-left p-4 font-medium resize-x" style={{ color: 'var(--muted-foreground)', width: '120px', minWidth: '100px' }}>Seller</th>
                              <th className="text-left p-4 font-medium resize-x" style={{ color: 'var(--muted-foreground)', width: '100px', minWidth: '80px' }}>Master Price</th>
                              <th 
                                className="text-left p-4 font-medium cursor-pointer hover:opacity-80 select-none resize-x" 
                                style={{ color: 'var(--muted-foreground)', width: '100px', minWidth: '80px' }}
                                onClick={() => handleSort('masterStock')}
                              >
                                <div className="flex items-center space-x-1">
                                  <span>Master Stock</span>
                                  <span className="text-xs opacity-60">
                                    {sortField === 'masterStock' ? (sortDirection === 'desc' ? '↓' : '↑') : '↕'}
                                  </span>
                                </div>
                              </th>
                              <th className="text-left p-4 font-medium resize-x" style={{ color: 'var(--muted-foreground)', width: '200px', minWidth: '180px' }}>Marketplace Pricing</th>
                              <th className="text-left p-4 font-medium resize-x" style={{ color: 'var(--muted-foreground)', width: '200px', minWidth: '180px' }}>Marketplace Stock</th>
                              <th 
                                className="text-left p-4 font-medium cursor-pointer hover:opacity-80 select-none resize-x" 
                                style={{ color: 'var(--muted-foreground)', width: '120px', minWidth: '100px' }}
                                onClick={() => handleSort('totalUnitsSold')}
                              >
                                <div className="flex items-center space-x-1">
                                  <span>Total Units Sold</span>
                                  <span className="text-xs opacity-60">
                                    {sortField === 'totalUnitsSold' ? (sortDirection === 'desc' ? '↓' : '↑') : '↕'}
                                  </span>
                                </div>
                              </th>
                              <th 
                                className="text-left p-4 font-medium cursor-pointer hover:opacity-80 select-none resize-x" 
                                style={{ color: 'var(--muted-foreground)', width: '120px', minWidth: '100px' }}
                                onClick={() => handleSort('totalRevenue')}
                              >
                                <div className="flex items-center space-x-1">
                                  <span>Total Revenue</span>
                                  <span className="text-xs opacity-60">
                                    {sortField === 'totalRevenue' ? (sortDirection === 'desc' ? '↓' : '↑') : '↕'}
                                  </span>
                                </div>
                              </th>
                              <th className="text-left p-4 font-medium resize-x" style={{ color: 'var(--muted-foreground)', width: '100px', minWidth: '80px' }}>Last Updated</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedProducts.map((product) => {
                              const status = getProductStatus(product);
                              return (
                                <tr 
                                  key={product.id} 
                                  className="border-b last:border-b-0 hover:opacity-90" 
                                  style={{ borderColor: 'var(--border)' }}
                                >
                                  {/* Image */}
                                  <td className="p-4">
                                    <img 
                                      src={product.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop'} 
                                      alt={product.name}
                                      className="w-12 h-12 rounded-lg object-cover"
                                    />
                                  </td>
                                  
                                  {/* SKU */}
                                  <td className="p-4">
                                    <span className="font-mono text-sm px-2 py-1 rounded" style={{ backgroundColor: 'var(--secondary)', color: 'var(--foreground)' }}>
                                      {product.sku}
                                    </span>
                                  </td>
                                  
                                  {/* Product Name with Status */}
                                  <td className="p-4">
                                    <div className="space-y-1">
                                      <span style={{ color: 'var(--foreground)' }}>{product.name}</span>
                                      <div className="flex items-center space-x-1">
                                        <div 
                                          className="w-3 h-3 rounded-full cursor-help"
                                          style={{ 
                                            backgroundColor: status === 'success' ? '#10b981' : status === 'partial' ? '#f59e0b' : '#ef4444'
                                          }}
                                          title={
                                            status === 'success' ? 'All systems operational' :
                                            status === 'partial' ? 'Some sync issues detected' :
                                            'Sync failures detected'
                                          }
                                        ></div>
                                        <span 
                                          className="text-xs cursor-help" 
                                          style={{ 
                                            color: status === 'success' ? '#10b981' : status === 'partial' ? '#f59e0b' : '#ef4444'
                                          }}
                                          title={
                                            status === 'success' ? 'All systems operational' :
                                            status === 'partial' ? 'Some sync issues detected' :
                                            'Sync failures detected'
                                          }
                                        >
                                          {status === 'success' ? 'Synced' : status === 'partial' ? 'Issues' : 'Failed'}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  
                                  {/* Seller */}
                                  <td className="p-4">
                                    <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                                      {product.seller.name}
                                    </span>
                                  </td>
                                  
                                  {/* Master Price */}
                                  <td className="p-4" style={{ color: 'var(--foreground)' }}>
                                    SAR {product.masterPrice}
                                  </td>
                                  
                                  {/* Master Stock */}
                                  <td className="p-4" style={{ color: 'var(--foreground)' }}>
                                    {product.masterStock}
                                  </td>
                                  
                                  {/* Marketplace Pricing */}
                                  <td className="p-4">
                                    <div className="space-y-0">
                                      {hasAnyListings(product) ? (
                                        product.listings.filter(l => l.isListed).length > 0 ? (
                                          product.listings.filter(l => l.isListed).map(listing => (
                                            <MarketplacePricing
                                              key={listing.id}
                                              product={product}
                                              listing={listing}
                                              editingState={editingState}
                                              onEdit={handleEdit}
                                            />
                                          ))
                                        ) : (
                                          <div className="p-3 rounded-lg border text-center" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                                            <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Marketplaces available but not listed</span>
                                          </div>
                                        )
                                      ) : (
                                        <div className="p-3 rounded-lg border text-center" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                                          <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No marketplace connections</span>
                                          <br />
                                          <button 
                                            className="text-xs px-2 py-1 mt-2 rounded hover:opacity-80"
                                            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                                            onClick={() => {
                                              window.history.replaceState({}, '', '/marketplace-accounts');
                                              window.dispatchEvent(new PopStateEvent('popstate'));
                                            }}
                                          >
                                            Setup Marketplaces →
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  
                                  {/* Marketplace Stock */}
                                  <td className="p-4">
                                    <div className="space-y-0">
                                      {hasAnyListings(product) ? (
                                        product.listings.filter(l => l.isListed).length > 0 ? (
                                          product.listings.filter(l => l.isListed).map(listing => (
                                            <MarketplaceStock
                                              key={listing.id}
                                              product={product}
                                              listing={listing}
                                              editingState={editingState}
                                              onEdit={handleEdit}
                                            />
                                          ))
                                        ) : (
                                          <div className="p-3 rounded-lg border text-center" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                                            <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Not listed</span>
                                          </div>
                                        )
                                      ) : (
                                        <div >

                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  
                                  {/* Units Sold */}
                                  <td className="p-4" style={{ color: 'var(--foreground)' }}>
                                    {product.totalUnitsSold.toLocaleString()}
                                  </td>
                                  
                                  {/* Revenue */}
                                  <td className="p-4" style={{ color: 'var(--foreground)' }}>
                                    SAR {product.totalRevenue.toLocaleString()}
                                  </td>
                                  
                                  {/* Last Updated */}
                                  <td className="p-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                                    {formatTimeAgo(product.lastUpdated)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <div className="flex items-center justify-between p-6 border-t" style={{ borderColor: 'var(--border)' }}>
                        <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                          Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} to {Math.min(pagination.currentPage * pagination.pageSize, filteredProducts.length)} of {filteredProducts.length} products
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                            disabled={pagination.currentPage === 1}
                            className="px-3 py-1 rounded border disabled:opacity-50"
                            style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                          >
                            Previous
                          </button>
                          
                          <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                            Page {pagination.currentPage} of {totalPages}
                          </span>
                          
                          <button
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.min(totalPages, prev.currentPage + 1) }))}
                            disabled={pagination.currentPage === totalPages}
                            className="px-3 py-1 rounded border disabled:opacity-50"
                            style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Demo Controls */}
                {showDemoControls && (
                  <div className="mt-12 rounded-lg p-4" style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Settings className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                        <span className="font-medium" style={{ color: 'var(--foreground)' }}>Demo Controls</span>
                        <div className="flex space-x-2">
                          {Object.entries(demoStates).map(([key, state]) => (
                            <button
                              key={key}
                              onClick={() => setDemoState(key as DemoState)}
                              className="px-3 py-1 rounded text-sm transition-colors"
                              style={{
                                backgroundColor: demoState === key ? 'var(--primary)' : 'var(--card)',
                                color: demoState === key ? 'var(--primary-foreground)' : 'var(--foreground)',
                                border: '1px solid var(--border)'
                              }}
                            >
                              {state.label}
                            </button>
                          ))}
                        </div>
                        <div className="h-4 w-px" style={{ backgroundColor: 'var(--border)' }}></div>
                        <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Import Demo:</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setImportScenario('new-seller')}
                            className="px-3 py-1 rounded text-sm transition-colors"
                            style={{
                              backgroundColor: importScenario === 'new-seller' ? 'var(--accent)' : 'var(--card)',
                              color: importScenario === 'new-seller' ? 'var(--accent-foreground)' : 'var(--foreground)',
                              border: '1px solid var(--border)'
                            }}
                          >
                            New Seller
                          </button>
                          <button
                            onClick={() => setImportScenario('existing-seller')}
                            className="px-3 py-1 rounded text-sm transition-colors"
                            style={{
                              backgroundColor: importScenario === 'existing-seller' ? 'var(--accent)' : 'var(--card)',
                              color: importScenario === 'existing-seller' ? 'var(--accent-foreground)' : 'var(--foreground)',
                              border: '1px solid var(--border)'
                            }}
                          >
                            Existing Seller
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowDemoControls(false)}
                        style={{ color: 'var(--primary)' }}
                        className="hover:opacity-80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Import Products Modal */}
        {activeModal === 'import' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="rounded-xl max-w-lg w-full p-6" style={{ backgroundColor: 'var(--card)' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Import Products
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 mt-0.5" style={{ color: 'var(--accent)' }} />
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                        We'll Handle the Rest
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                        Import products for any seller. For new sellers, we'll guide you to set up marketplace connections. 
                        For existing sellers, products will automatically link to connected marketplaces.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Seller Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    Select Seller
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowImportSellerDropdown(!showImportSellerDropdown)}
                      className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
                      style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{selectedSellerForImport.name}</span>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {showImportSellerDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-xl z-30" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                        {sellers.map((seller) => (
                          <button
                            key={seller.id}
                            onClick={() => {
                              setSelectedSellerForImport(seller);
                              setShowImportSellerDropdown(false);
                            }}
                            className="w-full flex items-center space-x-2 p-3 hover:opacity-80 transition-opacity text-left border-b last:border-b-0"
                            style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}
                          >
                            <User className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{seller.name}</div>
                              <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{seller.email}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => downloadCSVTemplate('full')}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                      style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Download Template</span>
                    </button>
                    
                    <label className="relative flex-1">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleSmartImport(e, 'import')}
                        className="hidden"
                        disabled={isImporting}
                      />
                      <div 
                        className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                      >
                        {isImporting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Upload className="w-5 h-5" />
                        )}
                        <span>{isImporting ? 'Processing...' : 'Import Products'}</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <strong>Complete product data:</strong> SKU, name, description, price, inventory
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveModal(null)}
                    disabled={isImporting}
                    className="flex-1 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Update Modal */}
        {activeModal === 'quick-updates' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="rounded-xl max-w-lg w-full p-6" style={{ backgroundColor: 'var(--card)' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Bulk Update Products
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 mt-0.5" style={{ color: 'var(--primary)' }} />
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                       Bulk & Quick Updates
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                        Update prices and inventory across all sellers at once. Perfect for discount campaigns or stock adjustments. 
                        We automatically routes each SKU to the correct seller.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => downloadCSVTemplate('bulk')}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                      style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Download Template</span>
                    </button>
                    
                    <label className="relative flex-1">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleSmartImport(e, 'quick-updates')}
                        className="hidden"
                        disabled={isImporting}
                      />
                      <div 
                        className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      >
                        {isImporting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Upload className="w-5 h-5" />
                        )}
                        <span>{isImporting ? 'Processing...' : 'Upload Updates'}</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <strong>Update format:</strong> SKU + price and/or inventory. Changes sync to all connected marketplaces.
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveModal(null)}
                    disabled={isImporting}
                    className="flex-1 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Import Progress Modal */}
        {importProgress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="rounded-xl max-w-lg w-full p-6" style={{ backgroundColor: 'var(--card)' }}>
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--foreground)' }}>
                Processing...
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--accent)' }}>
                      <span className="text-xs font-bold" style={{ color: 'var(--accent-foreground)' }}>1</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        Processing Updates ({importProgress.processed}/{importProgress.total})
                      </span>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        Auto-routing SKUs to sellers and applying changes
                      </div>
                      <div className="w-full rounded-full h-2 mt-2" style={{ backgroundColor: 'var(--secondary)' }}>
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: 'var(--accent)',
                            width: `${(importProgress.processed / importProgress.total) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Import Results Modal */}
        {importResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="rounded-xl max-w-md w-full p-6" style={{ backgroundColor: 'var(--card)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                {importResults.type === 'quick-updates' ? 'Quick Updates Complete!' : 'Import Complete!'}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {importResults.type === 'quick-updates' ? importResults.summary.updated : importResults.summary.created}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      {importResults.type === 'quick-updates' ? 'Updated' : 'Created'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                      {importResults.type === 'quick-updates' ? importResults.summary.affectedSellers : '1'}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      {importResults.type === 'quick-updates' ? 'Sellers Affected' : 'Seller'}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                  <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                    {importResults.message}
                  </p>
                  {importResults.details && (
                    <div className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                      {importResults.details}
                    </div>
                  )}
                  {importResults.seller && (
                    <div className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                      Seller: {importResults.seller}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  {importResults.nextStep === 'marketplace-setup' ? (
                    // New seller flow - guide to marketplace setup
                    <button
                      onClick={() => {
                        setImportResults(null);
                        setActiveModal(null);
                        // Simulate navigation to marketplace accounts
                        // setActivePage('marketplace-accounts')
                        window.history.replaceState({}, '', '/marketplace-accounts');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="w-full px-4 py-2 rounded-lg hover:opacity-90"
                      style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                    >
                      Continue to Marketplace Setup
                    </button>
                  ) : (
                    // Existing seller flow - just done
                    <button
                      onClick={() => setImportResults(null)}
                      className="w-full px-4 py-2 rounded-lg hover:opacity-90"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!showDemoControls && (
          <button
            onClick={() => setShowDemoControls(true)}
            className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg hover:opacity-90"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <Settings className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
};

export default ProductsPage;