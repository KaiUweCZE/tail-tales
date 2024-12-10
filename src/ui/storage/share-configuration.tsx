import useConfigurations from "@/hooks/useConfigurations";
import { Dispatch, SetStateAction } from "react";
import ShareSelector from "./share-selector";

const ShareConfiguration = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { configs } = useConfigurations();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="grid h-screen w-screen maximum-w mx-auto bg-slate-900/80 place-items-center fixed top-0 z-10"
      onClick={handleBackdropClick}
    >
      <div className="grid bg-slate-950 rounded-md p-6 z-20">
        <h2 className="text-amber-100">Share Your Configuration</h2>
        <ShareSelector configs={configs} />
      </div>
    </div>
  );
};

export default ShareConfiguration;
