import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/queryClient";
import { AppRouter } from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <AppRouter />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "bg-card border-border text-foreground",
              style: {
                background: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              },
            }}
          />
        </div>
        {import.meta.env.VITE_ENABLE_QUERY_DEVTOOLS === "true" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
