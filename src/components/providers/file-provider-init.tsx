"use client";

import { PropsWithChildren } from "react";
import useFetchFolders from "@/hooks/useFetchFolders";

export function FileProviderInit({ children }: PropsWithChildren) {
  const { isLoading, error } = useFetchFolders();

  if (isLoading) {
    return (
      <div className="grid fixed inset-0 items-center justify-center maximum-w mx-auto">
        <div className="grid place-items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-xl">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center p-4">
          <div className="text-red-500 text-xl mb-2">
            Error loading workspace
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
