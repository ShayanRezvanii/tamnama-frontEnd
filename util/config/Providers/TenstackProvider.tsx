/** @format */

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

function TenstackProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchInterval: false,
        retry: (failureCount: number, error: any) => {
          // Retry only if the error status code is not 404
          if (
            error?.response?.status === 404 ||
            error?.response?.status === 401
          ) {
            return false; // Do not retry
          }
          if (error?.response?.status === 500) {
            return false; // Do not retry
          }
          // Retry for other errors
          return failureCount < 1; // Retry for up to 5 times
        },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default TenstackProvider;
