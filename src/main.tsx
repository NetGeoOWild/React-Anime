import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeProvider";
import { App } from "@/App";
import "@/assets/css/index.css";
import "@/assets/css/fonts.css";
import "@/assets/css/toast.css";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl!);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
