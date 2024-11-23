import React, { Dispatch, SetStateAction } from "react";
import { Folders, Settings } from "lucide-react";
import Button from "../primitives/button";

interface MobileNavProps {
  isConfigOpen: boolean;
  setIsConfigOpen: Dispatch<SetStateAction<boolean>>;
  isAsideOpen: boolean;
  setIsAsideOpen: Dispatch<SetStateAction<boolean>>;
  isExpanded: boolean;
}

const MobileNav = ({
  isAsideOpen,
  setIsAsideOpen,
  isConfigOpen,
  setIsConfigOpen,
  isExpanded,
}: MobileNavProps) => {
  const exapndedCss = isExpanded ? "expanded" : "";
  return (
    <nav
      className={`grid fixed bottom-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 z-10 mobile-nav ${exapndedCss}`}
    >
      <div className="h-full w-full max-w-lg mx-auto px-4 flex items-center justify-around">
        <Button
          intent="ternary"
          size="sm"
          variant="column"
          leftIcon={
            <Folders
              className="w-5 h-5"
              color={isAsideOpen ? "#fde68a" : "white"}
            />
          }
          onClick={() => setIsAsideOpen((prev) => !prev)}
          active={isAsideOpen}
        >
          Files
        </Button>

        <Button
          intent="ternary"
          size="sm"
          variant="column"
          leftIcon={
            <Settings
              className="w-5 h-5"
              color={isConfigOpen ? "#fde68a" : "white"}
            />
          }
          onClick={() => setIsConfigOpen((prev) => !prev)}
          active={isConfigOpen}
        >
          Config
        </Button>
      </div>
    </nav>
  );
};

export default MobileNav;
