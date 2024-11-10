import { FileElement } from "../file-workspace/types";

const ConfigTab = ({ currentFile }: { currentFile: FileElement[] | null }) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Statistics</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(
          currentFile?.reduce((acc, el) => {
            acc[el.type] = (acc[el.type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>) || {}
        ).map(([type, count]) => (
          <div
            key={type}
            className="flex justify-between items-center bg-slate-700 p-2 rounded"
          >
            <span>{type}</span>
            <span className="px-2 py-0.5 rounded bg-slate-600">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigTab;
