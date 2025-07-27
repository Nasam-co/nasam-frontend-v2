# NASAM Admin Dashboard

## Tech Stack & Libraries

### Core Framework

- **React 19** + **TypeScript** (latest stable versions)
- **Vite 7** (lightning-fast build tool and dev server)

### State Management

- **Zustand 5** (lightweight client state management with devtools)
- **TanStack Query v5** (server state management, caching & synchronization)

### Routing & Navigation

- **React Router v7** (client-side routing with nested routes)

### UI & Styling

- **Tailwind CSS v4** (utility-first CSS framework)
- **Shadcn/ui** (accessible, customizable component library built on Radix UI)
- **Lucide React** (beautiful, customizable icons)
- **Class Variance Authority** (component variant styling)

### Forms & Validation

- **React Hook Form 7** (performant forms with minimal re-renders)
- **Zod 4** (TypeScript-first schema validation)

### Data Visualization

- **Chart.js 4** (canvas-based charts and graphs)
- **React Chart.js 2** (React wrapper for Chart.js)

### HTTP & API

- **Axios** (promise-based HTTP client)
- **js-cookie** (cookie management utility)

### Developer Experience

- **TypeScript 5** (static type checking)
- **ESLint** (code linting and formatting)
- **React Hot Toast** (toast notifications)

## Project Architecture

#### React has variety of folder and project architecture but we went with the feature-based architecture which is suitable for most dashbaords

```
src/
├── app/                         # Application entry and global setup
│   ├── App.tsx                  # Main app component
│   ├── router.tsx               # Application routing configuration
│   └── store.ts                 # Global store configuration
├── features/                    # Feature-based architecture
│   ├── auth/                    # Authentication feature
│   │   ├── components/
│   │   │   └── AuthGuard.tsx    # Route protection component
│   │   ├── pages/
│   │   │   └── LoginPage.tsx    # Login page with form validation
│   │   ├── services/
│   │   │   └── auth.ts          # Authentication API services
│   │   ├── store/
│   │   │   └── authStore.ts     # Auth state management (Zustand)
│   │   ├── types/
│   │   │   ├── auth.types.ts    # Authentication type definitions
│   │   │   └── index.ts         # Type exports
│   │   └── utils/               # Auth-specific utilities
│   └── overview/                # Dashboard overview feature
│       ├── components/
│       │   ├── DashboardCard.tsx        # Reusable dashboard card
│       │   ├── ItemCard.tsx             # Generic item display card
│       │   ├── ItemsSection.tsx         # Generic list section component
│       │   ├── LineRevenueChart.tsx     # Revenue chart visualization
│       │   ├── ProductList.tsx          # Product list container
│       │   ├── cards/                   # Stats card components
│       │   │   ├── StatCard.tsx
│       │   │   └── StatsGrid.tsx
│       │   ├── stockAlert/              # Stock alert components
│       │   │   ├── StockAlertCard.tsx
│       │   │   ├── StockAlertItem.tsx
│       │   │   └── StockAlerts.tsx
│       │   └── topPerformers/           # Top performers components
│       │       ├── TopPerformerCard.tsx
│       │       └── TopPerformers.tsx
│       ├── hooks/
│       │   └── useOverviewQueries.ts    # TanStack Query hooks
│       ├── pages/
│       │   └── OverviewPage.tsx         # Main dashboard page
│       ├── services/
│       │   └── overview.ts              # Overview API services
│       ├── store/
│       │   └── overviewStore.ts         # Overview state (Zustand)
│       └── types/
│           ├── overview.types.ts        # Overview type definitions
│           └── index.ts
├── shared/                      # Shared components and utilities
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # App header with marketplace/store selectors
│   │   │   ├── MainLayout.tsx   # Main layout wrapper
│   │   │   └── Sidebar.tsx      # Navigation sidebar
│   │   └── ui/                  # Shadcn/ui components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx       # Dropdown selector component
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx      # Sidebar primitive
│   │       ├── skeleton.tsx
│   │       └── tooltip.tsx
│   ├── hooks/
│   │   └── use-mobile.ts        # Mobile detection hook
│   └── utils/
│       ├── CookiesHelper.ts     # Cookie management utilities
│       ├── navConfig.ts         # Navigation configuration
│       └── index.ts
├── lib/                         # Core utilities and configurations
│   ├── api-client.ts            # Axios-based API client
│   ├── queryClient.ts           # TanStack Query configuration
│   └── utils.ts                 # Utility functions (cn, clsx)
├── routes/                      # Route definitions (placeholder)
├── main.tsx                     # Vite entry point
├── index.css                    # Global styles and Tailwind imports
└── vite-env.d.ts               # Vite environment types
```

## Development Patterns

### State Management Strategy

```typescript
// Zustand for client state
const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,

  storeUserData: (authenticatedUser) => {
    const { tokens, ...user } = authenticatedUser;
    setSecureCookie("user-data", JSON.stringify(user));
    setSecureCookie("auth-tokens", JSON.stringify(tokens), { expires: 1 / 24 });

    set({ user, tokens, isAuthenticated: true });
  },
}));

// TanStack Query for server state
const useOverviewData = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: () => overviewApi.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Component Composition Pattern

```typescript
// Generic reusable components
<ItemsSection
  title="Top Performers"
  headerAction={<FilterButton />}
  items={performers}
  renderItem={(performer) => <TopPerformerCard performer={performer} />}
  keyExtractor={(item) => item.id}
/>
```

### Security Implementation

- **Token Security**: HTTP-only cookies, secure flags, same-site protection
- **Data Separation**: User data separate from sensitive authentication tokens
- **Expiration Handling**: Automatic token validation and cleanup
- **XSS Protection**: No sensitive data in JavaScript-accessible storage

## Environment Setup

### Development

Note: to access you need to register a new account in databbase from the register back-end endpoint

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Type check and build
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Take .env.example and use your envs

```env
.env.example (development)
VITE_API_BASE_URL=http://localhost:3001/api
```

## Core Libraries

### Chart.js Implementation

```typescript
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const data = {
  labels: ["January", "February", "March"],
  datasets: [
    {
      label: "Amazon",
      data: [12000, 15000, 18000],
      borderColor: "rgb(255, 159, 64)",
      tension: 0.1,
    },
  ],
};
```

### Form Handling with React Hook Form + Zod

```typescript
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginCredentials>({
  resolver: zodResolver(loginSchema),
});
```

### Shadcn/ui Components

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

<Select value={selectedStore} onValueChange={setSelectedStore}>
  <SelectTrigger className="w-48">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {stores.map((store) => (
      <SelectItem key={store.value} value={store.value}>
        {store.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>;
```

## API Integration Ready

### Axios Client Configuration

```typescript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### TanStack Query Setup

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false; // Don't retry client errors
        }
        return failureCount < 3;
      },
    },
  },
});
```
