import { useContext } from "react";
import ConfigSelect from "./config-select";
import CreateConfigDialog from "./create-config";
import { FileContext } from "@/contexts/files-context";

const ConfigurationsSection = () => {
  const context = useContext(FileContext);

  return (
    <section className="grid bg-slate-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-amber-100 mb-6">
        Configurations
      </h2>
      <div className="space-y-4 mb-4">
        <div className="p-4 bg-slate-700 rounded-md">
          <div className="flex items-center justify-between text-amber-50">
            <span className="font-medium">Current Config:</span>
            <span>{context?.userConfig?.name}</span>
          </div>
        </div>
        <CreateConfigDialog />
      </div>
      <ConfigSelect />
    </section>
  );
};

export default ConfigurationsSection;
