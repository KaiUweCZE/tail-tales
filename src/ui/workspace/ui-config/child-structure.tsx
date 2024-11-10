import { FileElement } from "../file-workspace/types";
import ElementStructureCenter from "./element-structure-center";

const ChildStructure = ({ element }: { element: FileElement }) => {
  return (
    <div className="flex items-center gap-2 pl-4 hover:bg-slate-700/50 ml-4">
      <ElementStructureCenter element={element} />
    </div>
  );
};

export default ChildStructure;
