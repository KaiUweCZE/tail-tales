"use client";
import { FileProviderInit } from "@/components/providers/file-provider-init";
import useFetchConfig from "@/hooks/useFetchConfig";
import useFetchFiles from "@/hooks/useFetchFiles";
import useFetchFolders from "@/hooks/useFetchFolders";
import useWindowSize from "@/hooks/useWindowSize";
import AsideWorkspace from "@/ui/workspace/aside-workspace/aside-workspace";
import { WorkspaceProvider } from "@/ui/workspace/context/workspace-context";
import FileWorkspace from "@/ui/workspace/file-workspace/file-workspace";
import MobileNav from "@/ui/workspace/mobile-nav";
import UiConfig from "@/ui/workspace/ui-config/ui-config";
import React, { useEffect, useState } from "react";

const WorkspacePage = () => {
  const { isInit, error } = useFetchFolders(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const { isInitFile } = useFetchFiles();
  const { isLoading, userConfig } = useFetchConfig(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const windowSize = useWindowSize();
  const largeWindow = windowSize.width > 1280;

  const expandedCss = isExpanded ? "expanded" : "";

  useEffect(() => {
    if (!largeWindow) {
      setIsExpanded(false);
    }
  }, [largeWindow]);

  if (!isInit || !userConfig || !isInitFile)
    return (
      <FileProviderInit text="Loading your workspace..."></FileProviderInit>
    );

  return (
    <WorkspaceProvider>
      <main
        className={`workspace grid grid-cols-4 gap-2 h-min-50 max-h-[90dvh] overflow-hidden media-workspace relative z-10 ${expandedCss}`}
      >
        <AsideWorkspace isAsideOpen={isAsideOpen} isExpanded={isExpanded} />
        <FileWorkspace
          userConfig={userConfig}
          setIsExpanded={setIsExpanded}
          isExpanded={isExpanded}
          largeWindow={largeWindow}
        />
        <UiConfig isConfigOpen={isConfigOpen} isExpanded={isExpanded} />
        <MobileNav
          isConfigOpen={isConfigOpen}
          setIsConfigOpen={setIsConfigOpen}
          isAsideOpen={isAsideOpen}
          setIsAsideOpen={setIsAsideOpen}
          isExpanded={isExpanded}
        />
      </main>
    </WorkspaceProvider>
  );
};

export default WorkspacePage;
