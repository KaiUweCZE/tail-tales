"use client";
import { getFolders } from "@/app/workspace/action";
import { FileContext } from "@/contexts/files-context";
import {
  convertFetchedFolders,
  convertToUserFolderWithoutId,
} from "@/types/types";
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";

const useFetchFolders = () => {
  const context = useContext(FileContext);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error("useFetchFolders must be used within FileProvider");
  }

  const { isInit, setIsInit, folders, setFolders } = context;

  const fetchFolders = useCallback(async () => {
    if (status === "loading") return;
    if (!session?.user?.id) {
      setError("Not authenticated");
      return;
    }
    if (!session.user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const fetchedFolders = await getFolders(session.user.id);

      const userFolders = convertFetchedFolders(fetchedFolders);

      const foldersWithoutIds = userFolders.map(convertToUserFolderWithoutId);

      console.log("returned folders:", foldersWithoutIds);

      if (fetchedFolders) {
        setFolders(foldersWithoutIds);
        setIsInit(true);
      } else {
        setFolders([]);
        setIsInit(true);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch folders";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [status, isInit, setFolders]);

  useEffect(() => {
    if (!isInit && !isLoading) {
      fetchFolders();
    }
  }, [isInit, isLoading, fetchFolders]);

  return {
    isLoading,
    error,
    refetch: fetchFolders,
    isInit,
  };
};

export default useFetchFolders;
