import { Paintbrush } from "lucide-react";
import { useState } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState("#aaa");

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
        <span className="ml-2 text-xs text-gray-300 font-mono">{color}</span>
        <Paintbrush className="ml-2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default ColorPicker;
