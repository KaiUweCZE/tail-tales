import { Settings } from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";
import Input from "@/ui/primitives/input";
import Button from "@/ui/primitives/button";
import { createConfiguration } from "@/app/setting/action";
import { FileContext } from "@/contexts/files-context";

const CreateConfigDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [configName, setConfigName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(FileContext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      inputRef.current?.focus();
    } else {
      dialogRef.current?.close();
      setError(null);
      setConfigName("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    if (!configName.trim()) {
      setError("Please enter a configuration name");
      setIsCreating(false);
      return;
    }

    try {
      const result = await createConfiguration(configName);

      if (result.error) {
        console.log(result.error);

        setError(result.error);
        return;
      }

      if (result.success) {
        context?.setAllConfigs((prev) => {
          return [...prev, result.configuration];
        });
        setIsOpen(false);
      }
    } catch (err) {
      setError("An error occurred while creating the configuration");
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="lg">
        <Settings size={20} />
        <span>Create New Configuration</span>
      </Button>

      {isOpen && (
        <dialog
          ref={dialogRef}
          onClick={handleBackdropClick}
          className="bg-transparent p-0 backdrop:bg-slate-900/80 m-0 h-full w-full grid place-items-center"
        >
          <div className="bg-slate-900 rounded-lg shadow-lg p-6 border border-amber-100 w-96">
            <h2 className="text-xl text-amber-100 mb-6">
              Create New Configuration
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="configName" className="text-sm text-amber-50">
                  Configuration Name
                </label>
                <Input
                  ref={inputRef}
                  id="configName"
                  intent="secondary"
                  size="md"
                  placeholder="Enter configuration name"
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="error"
                  onClick={handleClose}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="light"
                  disabled={!configName.trim() || isCreating}
                  loadingText="Creating..."
                  isLoading={isCreating}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default CreateConfigDialog;
