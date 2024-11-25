import React from "react";
import HeaderStorage from "@/ui/store/header-storage";
import SearchStorage from "@/ui/store/search-storage";
import LayoutStorage from "@/ui/store/layout-storage";

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
