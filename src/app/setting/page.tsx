"use client";
import { FileProviderInit } from "@/components/providers/file-provider-init";
import { FileContext } from "@/contexts/files-context";
import useFetchConfig from "@/hooks/useFetchConfig";
import { useContext, useState } from "react";
import SuccessfulMessage from "@/components/successfull-message";
import { useSession } from "next-auth/react";
import ProfileSection from "@/ui/setting/profile-section";
import useConfigurations from "@/hooks/useConfigurations";
import ConfigForm from "./cofig-form";
import { SettingProvider } from "./context/setting-context";

const SettingPage = () => {
  const context = useContext(FileContext);
  const { isLoading, userConfig } = useFetchConfig();
  const { isLoading: configsLoading } = useConfigurations();
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: session } = useSession();

  if (!context || !session)
    return <FileProviderInit text="Loading your setting..."></FileProviderInit>;

  const { allConfigs } = context;
  const { user } = session;

  if (isLoading || configsLoading)
    return <FileProviderInit text="Loading your setting..."></FileProviderInit>;

  return (
    <SettingProvider>
      <main
        className="grid grid-cols-2 min-h-screen mt-4 p-4 media-setting"
        role="main"
      >
        <h1 className="text-3xl font-bold text-amber-100 mb-8 col-span-2">
          Settings
        </h1>
        <ConfigForm />
        {user && <ProfileSection user={user} configs={allConfigs} />}

        {isSuccess && (
          <SuccessfulMessage
            text="Configuration was saved"
            headline="Successful Configuration"
          />
        )}
      </main>
    </SettingProvider>
  );
};

export default SettingPage;
