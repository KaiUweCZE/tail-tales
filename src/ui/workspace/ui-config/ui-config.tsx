import { FileContext } from "@/contexts/files-context";
import { useContext, useState } from "react";
import UiConfigNav from "./ui-config-nav";
import StructureTab from "./structure-tab";
import StylesTab from "./styles-tab";
import ConfigTab from "./config-tab";
import { ActiveTabType } from "./types";
import Button from "@/ui/primitives/button";

const UiConfig = () => {
  const context = useContext(FileContext);
  const [activeTab, setActiveTab] = useState<ActiveTabType>("structure");

  if (!context || !context.userConfig) return <span>Context is missing</span>;

  const { currentFile, userConfig } = context;

  const { id, userId, createdAt, updatedAt, ...htmlElements } = userConfig;

  return (
    <div className="bg-slate-800 p-4">
      <UiConfigNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4">
        {activeTab === "structure" && (
          <StructureTab currentFile={currentFile} activeTab={activeTab} />
        )}

        {activeTab === "styles" && <StylesTab userConfig={htmlElements} />}

        {activeTab === "config" && <ConfigTab currentFile={currentFile} />}
      </div>
    </div>
  );
};

export default UiConfig;
