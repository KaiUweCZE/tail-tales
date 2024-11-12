"use client";
import { FileProviderInit } from "@/components/providers/file-provider-init";
import useFetchConfig from "@/hooks/useFetchConfig";
import useFetchFiles from "@/hooks/useFetchFiles";
import useFetchFolders from "@/hooks/useFetchFolders";
import AsideWorkspace from "@/ui/workspace/aside-workspace/aside-workspace";
import FileWorkspace from "@/ui/workspace/file-workspace/file-workspace";
import UiConfig from "@/ui/workspace/ui-config/ui-config";
import React from "react";

const WorkspacePage = () => {
  const { isInit, error } = useFetchFolders(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const { isInitFile } = useFetchFiles();
  const { isLoading, userConfig } = useFetchConfig(); // eslint-disable-line @typescript-eslint/no-unused-vars

  if (!isInit || !userConfig || !isInitFile)
    return <FileProviderInit></FileProviderInit>;

  return (
    <main className="grid grid-cols-4 gap-2 h-min-50">
      <AsideWorkspace />
      <FileWorkspace userConfig={userConfig} />
      <UiConfig />
    </main>
  );
};

export default WorkspacePage;
