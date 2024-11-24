"use client";
import { getConfig } from "@/app/setting/action";
import { FileContext } from "@/contexts/files-context";

import { useCallback, useContext, useEffect } from "react";

const useFetchConfig = () => {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useFetchFolders must be used within FileProvider");
  }

  const { userConfig, setUserConfig } = context;

  const fetchConfig = useCallback(async () => {
    try {
      const response = await getConfig();

      console.log("response is: ", response);

      if ("id" in response) {
        setUserConfig(response);
      } else if (response.error) {
        console.error("Failed to fetch config:", response.error);
      }
    } catch (error) {
      console.error("Error in fetchConfig", error);
    }
  }, [setUserConfig]);

  useEffect(() => {
    if (!userConfig) {
      fetchConfig();
    }
  }, [userConfig, fetchConfig]);

  return {
    isLoading: !userConfig,
    userConfig,
    refetch: fetchConfig,
    context,
  };
};

export default useFetchConfig;
