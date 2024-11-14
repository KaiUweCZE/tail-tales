"use client";
import { FileProviderInit } from "@/components/providers/file-provider-init";
import { FileContext } from "@/contexts/files-context";
import useFetchConfig from "@/hooks/useFetchConfig";
import { Lock, Mail, Trash2, User } from "lucide-react";
import { useContext, useState } from "react";
import { saveConfig } from "./action";
import SuccessfulMessage from "@/components/successfull-message";
import { htmlElements, HtmlKeys } from "./types";
import Button from "@/ui/primitives/button";
import { useSession } from "next-auth/react";

const iconStyle = "h-6 w-6";

const SettingPage = () => {
  const context = useContext(FileContext);
  const { isLoading, userConfig } = useFetchConfig();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  if (!context || !session)
    return <FileProviderInit text="Loading your setting..."></FileProviderInit>;

  const { setUserConfig } = context;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userConfig) {
      setError("No configuration to save");
      return;
    }

    setIsSaving(true);
    try {
      const { id, userId, createdAt, updatedAt, ...configToSave } = userConfig; // eslint-disable-line @typescript-eslint/no-unused-vars
      const result = await saveConfig(configToSave);

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

  if (isLoading)
    return (
      <FileProviderInit text="Loading your workspace..."></FileProviderInit>
    );

  return (
    <main className="grid grid-cols-2 mt-4" role="main">
      <form
        onSubmit={handleSubmit}
        className="form-setting"
        aria-label="Element styles configuration"
      >
        <fieldset className="grid gap-4" disabled={isSaving}>
          <legend className="mb-4 text-lg">HTML Elements Styles</legend>
          {htmlElements.map((element, index) => (
            <div key={`${element}${index}`} className="element-setting">
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
            </div>
          ))}
        </fieldset>
        <Button
          type="submit"
          variant="light"
          disabled={isSaving}
          loadingText="Saving..."
          className="place-self-end"
        >
          Save
        </Button>
      </form>
      <div>
        <h2>Profile</h2>
        <div className="grid gap-4">
          <div className="flex gap-4">
            <User className={iconStyle} />
            <span>{user?.name}</span>
          </div>
          <div className="flex gap-4">
            <Mail className={iconStyle} />
            {user?.email ? (
              <span>example@gmail.com</span>
            ) : (
              <Button variant="light">Add Email</Button>
            )}
          </div>
          <div className="flex gap-4">
            <Lock className={iconStyle} />
            <Button variant="light">Change Password</Button>
          </div>
          <div className="flex gap-4">
            <Trash2 className={iconStyle} />
            <Button variant="error">Delete User</Button>
          </div>
        </div>
      </div>
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
<Input
                size="md"
                label={element}
                onChange={(e) => setSetting(element, e.target.value)}
              />
*/
