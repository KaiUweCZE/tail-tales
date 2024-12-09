"use client";
import { UploadCloud } from "lucide-react";
import Button from "../primitives/button";
import ShareConfiguration from "./share-configuration";
import { useState } from "react";

const HeaderStorage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="flex items-center justify-between mb-8 mt-8">
        <h1 className="text-3xl font-bold text-amber-100">StyleSpace</h1>
        <Button
          size="md"
          //className="bg-amber-400 rounded-lg text-slate-900"
          leftIcon={<UploadCloud size={20} />}
          onClick={() => setIsOpen(!isOpen)}
        >
          Share Configuration
        </Button>
      </header>
      {isOpen && <ShareConfiguration setIsOpen={setIsOpen} />}
    </>
  );
};

export default HeaderStorage;
