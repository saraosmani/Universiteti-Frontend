import React                                from "react";
import ReactDOM                             from "react-dom/client";
import { BrowserRouter }                    from "react-router-dom";
import { Provider }                         from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store                                from "./store/index";
import App                                  from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
  },
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);