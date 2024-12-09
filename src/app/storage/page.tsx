import React from "react";
import HeaderStorage from "@/ui/storage/header-storage";
import SearchStorage from "@/ui/storage/search-storage";
import LayoutStorage from "@/ui/storage/layout-storage";

const StyleSpace = () => {
  return (
    <main>
      <HeaderStorage />
      <SearchStorage />
      <LayoutStorage />
    </main>
  );
};

export default StyleSpace;
