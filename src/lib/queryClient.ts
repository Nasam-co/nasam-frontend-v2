import { QueryClient } from "@tanstack/react-query";

// Create a client instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: true,
    },
  },
});
