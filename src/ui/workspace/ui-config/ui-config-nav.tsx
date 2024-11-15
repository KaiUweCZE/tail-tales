import { Dispatch, SetStateAction } from "react";
import { ActiveTabType } from "./types";

interface UiConfigProps {
  activeTab: ActiveTabType;
  setActiveTab: Dispatch<SetStateAction<UiConfigProps["activeTab"]>>;
}

const UiConfigNav = ({ activeTab, setActiveTab }: UiConfigProps) => {
  return (
    <div className="flex gap-2 pt-4 mb-4 border-b border-slate-700">
      {(["structure", "styles", "config"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 -mb-px ${
            activeTab === tab
              ? "border-b-2 border-amber-200 text-amber-200"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default UiConfigNav;
