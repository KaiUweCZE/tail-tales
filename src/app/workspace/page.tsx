"use client";
import { FileProviderInit } from "@/components/providers/file-provider-init";
import useFetchConfig from "@/hooks/useFetchConfig";
import useFetchFolders from "@/hooks/useFetchFolders";
import AsideWorkspace from "@/ui/workspace/aside-workspace";
import FileWorkspace from "@/ui/workspace/file-workspace/file-workspace";
import UiConfig from "@/ui/workspace/ui-config/ui-config";
import React from "react";

const WorkspacePage = () => {
  const { isInit, error } = useFetchFolders();
  const { isLoading, userConfig } = useFetchConfig();

  if (!isInit || !userConfig) return <FileProviderInit></FileProviderInit>;

  return (
    <main className="grid grid-cols-4 gap-2 h-min-50">
      <AsideWorkspace />
      <FileWorkspace userConfig={userConfig} />
      <UiConfig />
    </main>
  );
};

export default WorkspacePage;
