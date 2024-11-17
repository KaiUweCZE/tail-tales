import React, { Dispatch, SetStateAction } from "react";
import { Folders, Settings } from "lucide-react";
import { cn } from "@/utils/ui/utils";

interface MobileNavProps {
  isConfigOpen: boolean;
  setIsConfigOpen: Dispatch<SetStateAction<boolean>>;
  isAsideOpen: boolean;
  setIsAsideOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNav = ({
  isAsideOpen,
  setIsAsideOpen,
  isConfigOpen,
  setIsConfigOpen,
}: MobileNavProps) => {
  return (
    <>
      {/* Overlay pro pozadí při otevřeném panelu */}
      {/*activePanel && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity z-40"
          onClick={() => setActivePanel(null)}
        />
      )*/}

      {/* Spodní navigační lišta */}
      <nav className="grid fixed bottom-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 z-50 mobile-nav">
        <div className="h-full w-full max-w-lg mx-auto px-4 flex items-center justify-around">
          <button
            onClick={() => setIsAsideOpen((prev) => !prev)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              isAsideOpen
                ? "text-amber-400 bg-slate-900"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Folders
              className="w-5 h-5"
              color={isAsideOpen ? "#fde68a" : "white"}
            />
            <span className="text-xs mt-1">Files</span>
          </button>

          <button
            onClick={() => setIsConfigOpen((prev) => !prev)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              isConfigOpen
                ? "text-amber-400 bg-slate-900"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Settings
              className="w-5 h-5"
              color={isConfigOpen ? "#fde68a" : "white"}
            />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
