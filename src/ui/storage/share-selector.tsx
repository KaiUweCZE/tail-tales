import { DefaultConfiguration } from "@/app/setting/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Button from "../primitives/button";

const ShareSelector = ({ configs }: { configs: DefaultConfiguration[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reducedConfigs = configs.filter((c, index) => index > 0 && c);
  return (
    <div className="relative">
      <span className="text-sm">Your configurations:</span>
      <ul className="">
        <li
          className="flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{configs[0].name}</span>
          <ChevronDown className="h-4 w-4 cursor-pointer" />
        </li>
      </ul>
      <ul className="bg-cyan-400 expander-wrap absolute z-10">
        {isOpen &&
          reducedConfigs.map((config) => (
            <li key={config.id}>{config.name}</li>
          ))}
      </ul>
      <Button>Confirm</Button>
    </div>
  );
};

export default ShareSelector;
