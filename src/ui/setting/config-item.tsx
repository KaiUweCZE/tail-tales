import { MetaConfiguration } from "@/app/setting/types";
import clsx from "clsx";
import { Check, Trash2 } from "lucide-react";
import { memo } from "react";

interface ConfigItemProps {
  config: MetaConfiguration;
  isSelected: boolean;
  onSelect: (config: MetaConfiguration) => void;
  onDelete: (name: string) => void;
}

const ConfigItem = memo(
  ({ config, isSelected, onSelect, onDelete }: ConfigItemProps) => {
    return (
      <li
        role="option"
        aria-selected={isSelected}
        onMouseDown={() => onSelect(config)}
        className={`
        flex items-center justify-between px-4 py-3
        ${isSelected ? "text-amber-200" : "text-amber-50 hover:bg-slate-600"}
        cursor-pointer group transition-colors
      `}
      >
        <div className="flex items-center space-x-3">
          <span
            className={clsx("font-medium", {
              "text-amber-200": isSelected,
            })}
          >
            {config.name}
          </span>
        </div>

        {!isSelected && (
          <button
            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(config.name);
            }}
            aria-label={`Delete ${config.name} configuration`}
          >
            <Trash2 size={18} />
          </button>
        )}
      </li>
    );
  }
);
ConfigItem.displayName = "ConfigItem";

export default ConfigItem;
