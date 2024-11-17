"use client";
import { FileProviderInit } from "@/components/providers/file-provider-init";
import useFetchConfig from "@/hooks/useFetchConfig";
import useFetchFiles from "@/hooks/useFetchFiles";
import useFetchFolders from "@/hooks/useFetchFolders";
import AsideWorkspace from "@/ui/workspace/aside-workspace/aside-workspace";
import FileWorkspace from "@/ui/workspace/file-workspace/file-workspace";
import MobileNav from "@/ui/workspace/mobile-nav";
import UiConfig from "@/ui/workspace/ui-config/ui-config";
import React, { useState } from "react";

const WorkspacePage = () => {
  const { isInit, error } = useFetchFolders(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const { isInitFile } = useFetchFiles();
  const { isLoading, userConfig } = useFetchConfig(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  if (!isInit || !userConfig || !isInitFile)
    return (
      <FileProviderInit text="Loading your workspace..."></FileProviderInit>
    );

  return (
    <>
      <main className="grid grid-cols-4 gap-2 h-min-50 max-h-[90dvh] overflow-hidden media-workspace relative z-10">
        <AsideWorkspace isAsideOpen={isAsideOpen} />
        <FileWorkspace userConfig={userConfig} />
        <UiConfig isConfigOpen={isConfigOpen} />
        <MobileNav
          isConfigOpen={isConfigOpen}
          setIsConfigOpen={setIsConfigOpen}
          isAsideOpen={isAsideOpen}
          setIsAsideOpen={setIsAsideOpen}
        />
      </main>
    </>
  );
};

export default WorkspacePage;
