import { FileContext } from "@/contexts/files-context";
import { InputTypes } from "@/types/types";
import { useContext } from "react";

const InputFilename = ({ inputType }: { inputType: InputTypes }) => {
  const context = useContext(FileContext);

  if (!context) return <span>Context is missing</span>;

  const { inputName, setInputName, createInput } = context;

  return (
    <input
      className="rounded shadow-sm p-1 text-slate-900 focus:outline-cyan-300 focus:ring-0"
      aria-labelledby={`input-${inputType}`}
      placeholder={`set ${inputType} name`}
      type="text"
      name="input"
      value={inputName}
      id=""
      onChange={(e) => setInputName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          createInput(inputType, inputName);
        }
      }}
    />
  );
};

export default InputFilename;
