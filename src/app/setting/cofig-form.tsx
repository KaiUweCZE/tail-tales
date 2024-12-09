import useFetchConfig from "@/hooks/useFetchConfig";
import Button from "@/ui/primitives/button";
import Input from "@/ui/primitives/input";
import { htmlElements, HtmlKeys } from "./types";
import { Loader2, Save } from "lucide-react";
import useSaveConfig from "./hooks/useSaveConfig";
import { SettingContext } from "./context/setting-context";
import { useContext } from "react";

const ConfigForm = () => {
  const { isLoading, userConfig, setUserConfig } = useFetchConfig();
  const context = useContext(SettingContext);
  const { handleSave, error, isSaving, isSuccess, setIsSuccess } =
    useSaveConfig(userConfig);

  if (!context) return <span>Settign context is missing</span>;
  const { createNew } = context;

  const setConfigName = (value: string) => {
    setUserConfig((prev) => {
      if (!prev) return prev;
      return { ...prev, name: value };
    });
  };

  const setSetting = (element: HtmlKeys, value: string) => {
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

  return (
    <form
      onSubmit={handleSave}
      className="form-setting  bg-slate-800 rounded-lg p-6 shadow-lg"
      aria-label="Element styles configuration"
    >
      <fieldset
        className="grid gap-4 pr-8 overflow-y-auto max-h-[90dvh] scroll-primary"
        disabled={isSaving}
      >
        <legend className="text-xl font-semibold text-amber-100 mb-4">
          {createNew ? "Create New Config!" : "HTML Elements Styles"}
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
  );
};

export default ConfigForm;
