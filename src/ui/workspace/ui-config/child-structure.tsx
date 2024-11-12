import { FileElement } from "../file-workspace/types";
import ElementStructureCenter from "./element-structure-center";

const ChildStructure = ({ element }: { element: FileElement }) => {
  return (
    <div className="flex items-center gap-2 pl-4  ml-4">
      <ElementStructureCenter element={element} child={true} />
    </div>
  );
};

export default ChildStructure;
