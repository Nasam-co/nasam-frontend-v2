import React, { useState, useEffect } from 'react';
import { Upload, Package,  X,  Loader2,  Download, User, ChevronDown, Settings, BarChart3, Store, ShoppingBag, Plus, Edit3, UserPlus, TrendingUp } from 'lucide-react';


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

interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  inventory: number;
  lastUpdated: Date;
  seller: {
    id: number;
    name: string;
  };
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

const ProductsPage = () => {
  // Demo and navigation state
  const [demoState, setDemoState] = useState<DemoState>('empty');
  const [importScenario, setImportScenario] = useState<ImportScenario>('new-seller');
  const [showDemoControls, setShowDemoControls] = useState(true);

  const [selectedSellers, setSelectedSellers] = useState<Seller[]>([sellers[0]]);
  const [showSellerDropdown, setShowSellerDropdown] = useState(false);

  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  
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
    
    const baseProducts = [
      { id: 1, sku: 'TECH-001', name: 'Wireless Bluetooth Headphones', price: 299, inventory: 50, lastUpdated: new Date('2024-01-20'), seller: sellers[0] },
      { id: 2, sku: 'TECH-002', name: 'Smart Phone Case', price: 89, inventory: 120, lastUpdated: new Date('2024-01-19'), seller: sellers[0] },
      { id: 3, sku: 'TECH-003', name: 'USB-C Fast Charger', price: 45, inventory: 200, lastUpdated: new Date('2024-01-18'), seller: sellers[0] }
    ];

    if (state === 'multi-seller') {
      return [
        ...baseProducts,
        { id: 4, sku: 'FASH-001', name: 'Cotton T-Shirt', price: 79, inventory: 300, lastUpdated: new Date('2024-01-17'), seller: sellers[1] },
        { id: 5, sku: 'FASH-002', name: 'Denim Jeans', price: 199, inventory: 150, lastUpdated: new Date('2024-01-16'), seller: sellers[1] },
        { id: 6, sku: 'HOME-001', name: 'Ceramic Coffee Mug', price: 35, inventory: 500, lastUpdated: new Date('2024-01-15'), seller: sellers[2] },
        { id: 7, sku: 'HOME-002', name: 'Kitchen Towel Set', price: 25, inventory: 200, lastUpdated: new Date('2024-01-14'), seller: sellers[2] }
      ];
    }

    return baseProducts;
  };

  useEffect(() => {
    const newProducts = getProductsForState(demoState);
    setProducts(newProducts);
    
    // Auto-select all sellers if multi-seller demo
    if (demoState === 'multi-seller') {
      setSelectedSellers(sellers);
    } else if (demoState === 'single-seller') {
      setSelectedSellers([sellers[0]]);
    }
  }, [demoState]);

  // CSV template download
  const downloadCSVTemplate = (type: 'full' | 'bulk') => {
    let csvContent = '';
    
    if (type === 'full') {
      csvContent = `sku,name,nameAR,description,price,inventory
TECH-001,Wireless Bluetooth Headphones,سماعات بلوتوث لاسلكية,High-quality wireless headphones,299,50
FASH-001,Cotton T-Shirt,قميص قطني,Comfortable cotton t-shirt,79,300
HOME-001,Ceramic Coffee Mug,كوب قهوة سيراميك,Beautiful ceramic mug,35,500`;
    } else {
      csvContent = `sku,price,inventory
TECH-001,249,45
FASH-001,59,280
HOME-001,29,480`;
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

  const filteredProducts = products.filter(product => 
    selectedSellers.some(seller => seller.id === product.seller.id)
  );

  const toggleSeller = (seller: Seller) => {
    setSelectedSellers(prev => {
      const isSelected = prev.some(s => s.id === seller.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seller.id);
      } else {
        return [...prev, seller];
      }
    });
  };

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
          {description}
        </p>
      </div>
    </div>
  );



  return (
    <>
      <style>{cssVariables}</style>
      <div className="min-h-screen flex" style={{ backgroundColor: 'var(--background)' }}>
       

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6">
            <div className="max-w-6xl">
return (
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
                    <span>Bulk Updates</span>
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
                
                {/* Seller Filter */}
                {products.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowSellerDropdown(!showSellerDropdown)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">
                        {selectedSellers.length === sellers.length 
                          ? 'All Sellers' 
                          : selectedSellers.length === 1 
                            ? selectedSellers[0].name
                            : `${selectedSellers.length} Sellers`
                        }
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {showSellerDropdown && (
                      <div className="absolute top-full right-0 mt-2 rounded-lg shadow-xl z-20 min-w-64" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                        <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
                          <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Filter by Sellers</span>
                        </div>
                        {sellers.map((seller) => (
                          <label
                            key={seller.id}
                            className="flex items-center space-x-3 p-3 hover:opacity-80 transition-opacity cursor-pointer border-b last:border-b-0"
                            style={{ borderColor: 'var(--border)' }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedSellers.some(s => s.id === seller.id)}
                              onChange={() => toggleSeller(seller)}
                              className="rounded"
                              style={{ accentColor: 'var(--accent)' }}
                            />
                            <div>
                              <div className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{seller.name}</div>
                              <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{seller.email}</div>
                            </div>
                          </label>
                        ))}
                        <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
                          <button
                            onClick={() => setShowSellerDropdown(false)}
                            className="w-full text-center text-sm px-3 py-1 rounded"
                            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {filteredProducts.length === 0 ? (
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
                /* Products Table */
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--muted-foreground)' }}>SKU</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--muted-foreground)' }}>Product Name</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--muted-foreground)' }}>Seller</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--muted-foreground)' }}>Price</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--muted-foreground)' }}>Inventory</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--muted-foreground)' }}>Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b last:border-b-0 hover:opacity-80" style={{ borderColor: 'var(--border)' }}>
                          <td className="p-4">
                            <span className="font-mono text-sm px-2 py-1 rounded" style={{ backgroundColor: 'var(--secondary)', color: 'var(--foreground)' }}>
                              {product.sku}
                            </span>
                          </td>
                          <td className="p-4" style={{ color: 'var(--foreground)' }}>{product.name}</td>
                          <td className="p-4">
                            <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                              {product.seller.name}
                            </span>
                          </td>
                          <td className="p-4" style={{ color: 'var(--foreground)' }}>SAR {product.price}</td>
                          <td className="p-4" style={{ color: 'var(--foreground)' }}>{product.inventory}</td>
                          <td className="p-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            {formatTimeAgo(product.lastUpdated)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
        );
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
                      <Download className="w-4 h-4" />
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
                        Quick Updates
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
                      <Download className="w-4 h-4" />
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