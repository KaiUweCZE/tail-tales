import { SquareMousePointer } from "lucide-react";
import { FileElement } from "../file-workspace/types";
import { selectedElement } from "./utils/selectElement";

const ElementStructureCenter = ({ element }: { element: FileElement }) => {
  return (
    <div className="grid gap-1">
      <div className="flex gap-2">
        <span className="text-amber-200">{element.type}</span>
        <span className="flex items-center gap-2">
          {`#${element.id}`}{" "}
          <SquareMousePointer
            className="w-4 h-4 cursor-pointer"
            onClick={() => selectedElement(element.id)}
          />
        </span>
      </div>
      {/* <span className="text-amber-200">{`${element.type} #${element.id}`}</span>
      <span className="w-fit text-xs px-1.5 rounded border border-slate-600">
        {`#${element.id}`}
      </span> */}
      {element.cssClass && (
        <span className="col-span-2 text-xs px-1.5 py-0.5 rounded bg-slate-700">
          {element.cssClass}
        </span>
      )}
    </div>
  );
};

export default ElementStructureCenter;
