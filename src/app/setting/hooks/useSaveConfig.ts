import { useState } from "react";
import { DefaultConfiguration } from "../types";
import { saveConfig } from "../action";

const useSaveConfig = (userConfig: DefaultConfiguration | null) => {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userConfig) {
      setError("No configuration to save");
      return;
    }

    setIsSaving(true);
    try {
      const { id, userId, createdAt, updatedAt, name, ...configToSave } =
        userConfig;
      const result = await saveConfig(id, configToSave, name);

      if (result.error) {
        setError(result.error);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      console.log("Configuration saved successfully");
    } catch (error) {
      setError("Failed to save configuration");
      console.error("Failed to save configuration:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleSave,
    error,
    isSaving,
    isSuccess,
    setError,
    setIsSuccess,
  };
};

export default useSaveConfig;
