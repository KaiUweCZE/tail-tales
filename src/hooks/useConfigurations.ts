import { getAllConfigs } from "@/app/setting/action";
import { FileContext } from "@/contexts/files-context";
import { useCallback, useContext, useEffect, useState } from "react";

const useConfigurations = () => {
  const context = useContext(FileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!context) {
    throw new Error("useConfigurations must be used within FileProvider");
  }

  const { allConfigs, setAllConfigs, configsInit, setConfigsInit } = context;

  const handleGetConfigs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllConfigs();
      if (result?.data) {
        setAllConfigs(result.data);
        setConfigsInit(true);
      } else {
        setError(result?.error || "No configurations found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch configurations");
    } finally {
      setIsLoading(false);
    }
  }, [setAllConfigs, setConfigsInit]);

  useEffect(() => {
    if (!configsInit) {
      handleGetConfigs();
    }
  }, [configsInit, handleGetConfigs]);
  return {
    configs: allConfigs,
    isLoading,
    error,
    refreshConfigs: handleGetConfigs,
  };
};

export default useConfigurations;
