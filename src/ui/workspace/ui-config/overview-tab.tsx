import { useContext } from "react";
import { FileElement } from "../file-workspace/types";
import { WorkspaceContext } from "../context/workspace-context";
import { Plus, Trash2, X } from "lucide-react";

const OverviewTab = ({
  currentFile,
}: {
  currentFile: FileElement[] | null;
}) => {
  const context = useContext(WorkspaceContext);

  if (!context) return <span>Context is missing</span>;

  const { navState, setNavState } = context;

  const handleRemoveElement = (e: string) => {
    setNavState((prev) => {
      return prev.map((el) =>
        el.name === e ? { name: e, active: false } : el
      );
    });
  };

  const handleAddElement = (e: string) => {
    setNavState((prev) => {
      return prev.map((el) => (el.name === e ? { name: e, active: true } : el));
    });
  };
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Overview</h2>
      <div className="">
        <ul className="grid grid-cols-3 gap-2 w-full">
          {navState.map((element, index) => (
            <li
              key={`${element}${index}`}
              className="relative flex gap-2 items-center border border-amber-100 p-1 justify-between rounded-md cursor-pointer hover:bg-slate-900 hover:border-amber-200 "
            >
              <span className="z-10">{element.name}</span>{" "}
              {element.active ? (
                <Trash2
                  className="w-4 h-4 z-10"
                  onClick={() => handleRemoveElement(element.name)}
                />
              ) : (
                <Plus
                  className="w-4 h-4 z-10"
                  onClick={() => handleAddElement(element.name)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewTab;
