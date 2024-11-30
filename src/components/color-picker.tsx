import { FileContext } from "@/contexts/files-context";
import { WorkspaceContext } from "@/ui/workspace/context/workspace-context";
import { Paintbrush } from "lucide-react";
import { useContext, useState } from "react";

const ColorPicker = () => {
  const context = useContext(FileContext);

  if (!context) return <span>Context is missing</span>;

  const { color, setColor } = context;
  return (
    <div className="flex items-center gap-1">
      <div className="relative flex items-center rounded-lg p-2 border border-slate-700">
        <div className="w-4 h-4 rounded-md" style={{ backgroundColor: color }}>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </div>
        <span className="ml-2 text-xs text-gray-300 font-mono">
          {color ? color : "#1e293b"}
        </span>
        <Paintbrush className="ml-2 w-3 h-3 text-gray-400" />
      </div>
    </div>
  );
};

export default ColorPicker;
