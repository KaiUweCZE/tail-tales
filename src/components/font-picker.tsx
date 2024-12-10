import { FileContext } from "@/contexts/files-context";
import { Type } from "lucide-react";
import { useContext } from "react";

const fonts = [
  { name: "Inter", value: "inter" },
  { name: "Roboto", value: "roboto" },
  { name: "Open Sans", value: "open-sans" },
  { name: "Montserrat", value: "montserrat" },
  { name: "Lato", value: "lato" },
];

const FontPicker = () => {
  const context = useContext(FileContext);
  if (!context) return null;

  const { font, setFont } = context;

  return (
    <div className="flex items-center gap-1">
      <div className="relative flex items-center rounded-lg p-2 border border-slate-700">
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="bg-slate-800 text-xs font-mono cursor-pointer w-fit"
        >
          {fonts.map((f) => (
            <option key={f.value} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
        <Type className="ml-2 w-3 h-3 text-gray-400" />
      </div>
    </div>
  );
};

export default FontPicker;
