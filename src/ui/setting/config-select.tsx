import { FileContext } from "@/contexts/files-context";
import { ChevronDown } from "lucide-react";
import { useContext, useState, useCallback } from "react";
import ConfigItem from "./config-item";
import { MetaConfiguration } from "@/app/setting/types";

const ConfigSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FileContext);

  if (!context) return <span>Context is missing</span>;

  const { allConfigs, userConfig, setUserConfig } = context;

  const handleSelect = useCallback(
    (config: MetaConfiguration) => {
      console.log("config state", config);

      setUserConfig(config);
      setIsOpen(false);
    },
    [setUserConfig]
  );

  const handleDelete = useCallback((name: string) => {
    console.log("wiil be delivered");
  }, []);

  return (
    <div
      className="relative w-full"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-amber-50 rounded-md transition-colors flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="config-label"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center space-x-3">
          <span className="font-medium" onClick={() => console.log("Cocoo")}>
            {userConfig?.name}
          </span>
        </span>
        <ChevronDown
          size={20}
          className={`text-amber-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby="config-label"
          className="absolute z-10 w-full mt-2 bg-slate-700 rounded-md shadow-lg overflow-hidden"
          onClick={() => console.log("KLILIki")}
        >
          {allConfigs.map((config) => (
            <ConfigItem
              key={config.id}
              config={config}
              isSelected={config.name === userConfig?.name}
              onSelect={handleSelect}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConfigSelect;
