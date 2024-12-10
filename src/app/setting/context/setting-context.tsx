import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface SettingProps {
  createNew: boolean;
  setCreateNew: Dispatch<SetStateAction<boolean>>;
}

export const SettingContext = createContext<SettingProps | undefined>(
  undefined
);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [createNew, setCreateNew] = useState(false);

  const contextValues = {
    createNew,
    setCreateNew,
  };

  return (
    <SettingContext.Provider value={contextValues}>
      {children}
    </SettingContext.Provider>
  );
};
