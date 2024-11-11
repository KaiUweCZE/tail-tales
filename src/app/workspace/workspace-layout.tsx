"use client";
import { FileProvider } from "@/contexts/files-context";
import { PropsWithChildren } from "react";

const WorkspaceContent = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export const WorkspaceLayout = ({ children }: PropsWithChildren) => {
  return (
    <FileProvider>
      <WorkspaceContent>{children}</WorkspaceContent>
    </FileProvider>
  );
};
