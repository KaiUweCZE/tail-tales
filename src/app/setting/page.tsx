"use client";

import { FileProviderInit } from "@/components/providers/file-provider-init";
import { FileContext } from "@/contexts/files-context";
import { useContext } from "react";

const htmlElements = [
  "h1",
  "h2",
  "h3",
  "p",
  "span",
  "div",
  "ul",
  "li",
  "article",
  "hr",
  "button",
  "a",
] as const;

type HtmlElements = (typeof htmlElements)[number];

const SettingPage = () => {
  const context = useContext(FileContext);

  if (!context) return <FileProviderInit></FileProviderInit>;

  const { userSetting, setUserSetting } = context;

  const setSetting = (element: HtmlElements, value: string) => {
    setUserSetting((prev) => {
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
    <main className="grid grid-cols-2 mt-4">
      <form action="" className="form-setting">
        {htmlElements.map((element) => (
          <div key={element} className="element-setting">
            <label htmlFor="">{element}</label>
            <input
              type="text"
              name=""
              id=""
              className="rounded-sm bg-slate-300 focus:bg-slate-100 text-sm text-slate-900 px-2"
              onChange={(e) => setSetting(element, e.target.value)}
            />
          </div>
        ))}
      </form>
      <div>
        <h2>Set your elements!</h2>
        <button className="bg-slate-800 px-4 rounded">Save!</button>
      </div>
    </main>
  );
};

export default SettingPage;
