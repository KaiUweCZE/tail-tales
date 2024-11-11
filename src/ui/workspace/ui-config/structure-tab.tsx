import { FileElement } from "../file-workspace/types";
import ElementStructureWrap from "./element-structure-wrap";
import { ActiveTabType } from "./types";

interface StructureTabProps {
  activeTab: ActiveTabType;
  currentFile: FileElement[] | null;
}

const StructureTab = ({ activeTab, currentFile }: StructureTabProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Document Structure</h2>
      {currentFile && currentFile.length > 0 ? (
        <div className="grid gap-2 font-mono text-sm">
          {currentFile
            .filter((el) => !el.parentId)
            .map((element) => (
              <ElementStructureWrap
                key={element.id}
                element={element}
                currentFile={currentFile}
              />
            ))}
        </div>
      ) : (
        <p className="text-slate-400">No elements yet</p>
      )}
    </div>
  );
};

export default StructureTab;
