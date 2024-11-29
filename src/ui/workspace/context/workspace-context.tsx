"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { navElements } from "../file-workspace/data";

type ItemType = { name: (typeof navElements)[number]; active: boolean };

interface WorkspaceType {
  navState: ItemType[];
  setNavState: Dispatch<SetStateAction<ItemType[]>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

export const WorkspaceContext = createContext<WorkspaceType | undefined>(
  undefined
);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [navState, setNavState] = useState<ItemType[]>(() =>
    navElements.map((e) => ({ name: e, active: true }))
  );
  const [color, setColor] = useState("#1E293B");

  const contextValues = {
    navState,
    setNavState,
    color,
    setColor,
  };

  return (
    <WorkspaceContext.Provider value={contextValues}>
      {children}
    </WorkspaceContext.Provider>
  );
};
