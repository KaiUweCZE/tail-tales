"use client";
//import { PropsWithChildren } from "react";

export function FileProviderInit() {
  return (
    <div className="grid fixed inset-0 items-center justify-center maximum-w mx-auto">
      <div className="grid place-items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-xl">Loading your workspace...</p>
      </div>
    </div>
  );
}
