import React, { useState } from "react";
import { Folders, Settings, Plus, X } from "lucide-react";
import { cn } from "@/utils/ui/utils";

const MobileNavCircular = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<"files" | "config" | null>(
    null
  );

  const handlePanelOpen = (panel: "files" | "config") => {
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {activePanel && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity z-40"
          onClick={() => setActivePanel(null)}
        />
      )}

      {/* Sliding Panels */}
      <div
        className={cn(
          "fixed bottom-24 left-0 w-64 bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 h-[calc(100vh-7rem)] rounded-r-xl transition-transform duration-300 ease-out z-40 shadow-lg",
          activePanel === "files" ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h2 className="text-slate-200 font-medium">Files & Folders</h2>
          <button
            onClick={() => setActivePanel(null)}
            className="p-1.5 hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <div className="p-2">{/* AsideWorkspace content */}</div>
      </div>

      <div
        className={cn(
          "fixed bottom-24 right-0 w-64 bg-slate-800/95 backdrop-blur-sm border-l border-slate-700/50 h-[calc(100vh-7rem)] rounded-l-xl transition-transform duration-300 ease-out z-40 shadow-lg",
          activePanel === "config" ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h2 className="text-slate-200 font-medium">Configuration</h2>
          <button
            onClick={() => setActivePanel(null)}
            className="p-1.5 hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <div className="p-2">{/* UiConfig content */}</div>
      </div>

      {/* Circular Navigation Menu */}
      <div className="fixed bottom-6 right-6 z-50 sm:hidden">
        {/* Action Buttons - appear when menu is open */}
        <div
          className={cn(
            "absolute bottom-0 right-0 transition-all duration-300 ease-in-out origin-bottom-right",
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <div className="relative -top-20 -left-20">
            <button
              onClick={() => handlePanelOpen("files")}
              className={cn(
                "absolute p-3 rounded-full shadow-lg transition-all duration-300",
                "bg-slate-700 hover:bg-slate-600 text-slate-200",
                activePanel === "files" ? "bg-amber-500 hover:bg-amber-400" : ""
              )}
            >
              <Folders className="w-5 h-5" />
            </button>
          </div>
          <div className="relative -top-20">
            <button
              onClick={() => handlePanelOpen("config")}
              className={cn(
                "absolute p-3 rounded-full shadow-lg transition-all duration-300",
                "bg-slate-700 hover:bg-slate-600 text-slate-200",
                activePanel === "config"
                  ? "bg-amber-500 hover:bg-amber-400"
                  : ""
              )}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-4 rounded-full shadow-lg transition-all duration-300 transform",
            "bg-amber-500 hover:bg-amber-400 text-slate-900",
            isOpen && "rotate-45"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
};

export default MobileNavCircular;
