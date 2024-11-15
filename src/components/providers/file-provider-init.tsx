"use client";
//import { PropsWithChildren } from "react";

// add text props
export function FileProviderInit({ text }: { text: string }) {
  return (
    <div className="grid fixed inset-0 items-center justify-center maximum-w mx-auto">
      <div className="grid place-items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-xl">{text}</p>
      </div>
    </div>
  );
}
