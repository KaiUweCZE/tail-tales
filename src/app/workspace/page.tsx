import { FileProvider } from "@/contexts/files-context";
import AsideWorkspace from "@/ui/workspace/aside-workspace";
import FileWorkspace from "@/ui/workspace/file-workspace";
import UiConfig from "@/ui/workspace/ui-config";
import React from "react";

const WorkspacePage = () => {
  return (
    <FileProvider>
      <main className="grid grid-cols-4 gap-2 h-min-50">
        <AsideWorkspace />
        <FileWorkspace />
        <UiConfig />
      </main>
    </FileProvider>
  );
};

export default WorkspacePage;
