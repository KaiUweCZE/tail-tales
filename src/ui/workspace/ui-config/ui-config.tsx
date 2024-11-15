import { FileContext } from "@/contexts/files-context";
import { useContext, useState } from "react";
import UiConfigNav from "./ui-config-nav";
import StructureTab from "./structure-tab";
import StylesTab from "./styles-tab";
import { ActiveTabType } from "./types";
import OverviewTab from "./overview-tab";

const UiConfig = () => {
  const context = useContext(FileContext);
  const [activeTab, setActiveTab] = useState<ActiveTabType>("structure");

  if (!context || !context.userConfig) return <span>Context is missing</span>;

  const { currentFile, userConfig } = context;

  const { id, userId, createdAt, updatedAt, ...htmlElements } = userConfig; // eslint-disable-line @typescript-eslint/no-unused-vars

  return (
    <div className="bg-slate-800 px-4 pb-4 h-fit max-h-[83dvh] overflow-y-auto scroll-primary">
      <UiConfigNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4">
        {activeTab === "structure" && (
          <StructureTab currentFile={currentFile} activeTab={activeTab} />
        )}

        {activeTab === "styles" && <StylesTab userConfig={htmlElements} />}

        {activeTab === "config" && <OverviewTab currentFile={currentFile} />}
      </div>
    </div>
  );
};

export default UiConfig;
