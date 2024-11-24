"use client";
import { FileProviderInit } from "@/components/providers/file-provider-init";
import { FileContext } from "@/contexts/files-context";
import useFetchConfig from "@/hooks/useFetchConfig";
import { Loader2, Save } from "lucide-react";
import { useContext, useState } from "react";
import { saveConfig } from "./action";
import SuccessfulMessage from "@/components/successfull-message";
import { htmlElements, HtmlKeys } from "./types";
import Button from "@/ui/primitives/button";
import { useSession } from "next-auth/react";
import ProfileSection from "@/ui/setting/profile-section";
import Input from "@/ui/primitives/input";
import useConfigurations from "@/hooks/useConfigurations";

const SettingPage = () => {
  const context = useContext(FileContext);
  const { isLoading, userConfig } = useFetchConfig();
  const { isLoading: configsLoading } = useConfigurations();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  if (!context || !session)
    return <FileProviderInit text="Loading your setting..."></FileProviderInit>;

  const { setUserConfig, allConfigs } = context;
  const { user } = session;

  const setSetting = (element: HtmlKeys, value: string) => {
    setError(null);
    setUserConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [element]: {
          ...prev[element],
          className: value,
        },
      };
    });
  };

  const setConfigName = (value: string) => {
    setError(null);
    setUserConfig((prev) => {
      if (!prev) return prev;
      return { ...prev, name: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userConfig) {
      setError("No configuration to save");
      return;
    }

    setIsSaving(true);
    try {
      const { id, userId, createdAt, updatedAt, name, ...configToSave } =
        userConfig; // eslint-disable-line @typescript-eslint/no-unused-vars
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

  if (isLoading || configsLoading)
    return <FileProviderInit text="Loading your setting..."></FileProviderInit>;

  return (
    <main
      className="grid grid-cols-2 min-h-screen mt-4 p-4 media-setting"
      role="main"
    >
      <h1 className="text-3xl font-bold text-amber-100 mb-8 col-span-2">
        Settings
      </h1>
      <form
        onSubmit={handleSubmit}
        className="form-setting  bg-slate-800 rounded-lg p-6 shadow-lg"
        aria-label="Element styles configuration"
      >
        <fieldset
          className="grid gap-4 pr-8 overflow-y-auto max-h-[90dvh] scroll-primary"
          disabled={isSaving}
        >
          <legend className="text-xl font-semibold text-amber-100 mb-4">
            HTML Elements Styles
          </legend>
          <div className="element-setting">
            <label htmlFor="config-name">Name: </label>
            <Input
              intent="secondary"
              size="md"
              type="text"
              value={userConfig?.name}
              onChange={(e) => setConfigName(e.target.value)}
              placeholder="Enter Configuration Name"
            />
          </div>
          {htmlElements.map((element, index) => (
            <div key={`${element}${index}`} className="element-setting">
              <label htmlFor={`style-${element}`}>{element}</label>
              <Input
                intent="secondary"
                size="md"
                aria-label={element}
                type="text"
                name={`style-${element}`}
                id={`style-${element}`}
                aria-describedby={`hint-${element}`}
                value={
                  userConfig && element in userConfig
                    ? userConfig[element]?.className
                    : ""
                }
                placeholder="Enter Tailwind classes"
                onChange={(e) => setSetting(element, e.target.value)}
              />
            </div>
          ))}
        </fieldset>
        <Button
          type="submit"
          variant="light"
          disabled={isSaving}
          loadingText="Saving..."
          className="place-self-end mr-8"
          leftIcon={
            isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin " />
            ) : (
              <Save className="h-4 w-4" />
            )
          }
        >
          Save
        </Button>
      </form>
      {user && <ProfileSection user={user} configs={allConfigs} />}

      {isSuccess && (
        <SuccessfulMessage
          text="Configuration was saved"
          headline="Successful Configuration"
        />
      )}
    </main>
  );
};

export default SettingPage;

/*
<label htmlFor={`style-${element}`}>{element}</label>
              <input
                type="text"
                name={`style-${element}`}
                id={`style-${element}`}
                aria-describedby={`hint-${element}`}
                value={
                  userConfig && element in userConfig
                    ? userConfig[element]?.className
                    : ""
                }
                placeholder="Enter Tailwind classes"
                className="rounded-sm bg-slate-300 focus:bg-slate-100 text-sm text-slate-900 px-2"
                onChange={(e) => setSetting(element, e.target.value)}
              />

*/
