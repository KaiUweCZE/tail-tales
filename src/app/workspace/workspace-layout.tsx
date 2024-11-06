"use client";
import { FileProvider } from "@/contexts/files-context";
import useFetchFolders from "@/hooks/useFetchFolders";
import { PropsWithChildren } from "react";

const WorkspaceContent = ({ children }: PropsWithChildren) => {
  const { isLoading, error } = useFetchFolders();

  if (isLoading) return <div>Loading folders...</div>;
  if (error) return <div>Error: {error}</div>;

  return <>{children}</>;
};

export const WorkspaceLayout = ({ children }: PropsWithChildren) => {
  return (
    <FileProvider>
      <WorkspaceContent>{children}</WorkspaceContent>
    </FileProvider>
  );
};
