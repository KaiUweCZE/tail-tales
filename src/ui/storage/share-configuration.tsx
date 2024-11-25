import { FileContext } from "@/contexts/files-context";
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";

const ShareConfiguration = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const context = useContext(FileContext);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!context) return <span>Context is missing...</span>;

  const { allConfigs } = context;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === containerRef.current) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="grid h-screen w-screen maximum-w mx-auto bg-slate-900/80 place-items-center fixed top-0 z-10"
      onClick={handleClose}
    >
      <div className="grid bg-slate-950 rounded-md p-6">
        <h2 className="text-amber-100">Share Your Configuration</h2>
        <div>
          {allConfigs.map((config) => (
            <div key={config.id}>
              <span>{config.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareConfiguration;
