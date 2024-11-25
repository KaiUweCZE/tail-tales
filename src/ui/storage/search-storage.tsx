"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import Button from "../primitives/button";

const SearchStorage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = [
    { id: "all", name: "All" },
    { id: "blog", name: "Blog" },
    { id: "docs", name: "Documentation" },
    { id: "minimal", name: "Minimal" },
    { id: "modern", name: "Modern" },
    { id: "creative", name: "Creative" },
  ];
  return (
    <div className="grid space-y-4 mb-8">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search styles..."
          className="w-full bg-slate-800 text-gray-300 pl-10 pr-4 py-3 rounded border border-slate-700 focus:border-amber-400 focus:outline-none"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button key={cat.id} onClick={() => setActiveCategory(cat.id)}>
              {cat.name}
            </Button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <select className="bg-slate-800 text-gray-300 px-4 py-2 rounded border border-slate-700 focus:border-amber-400 focus:outline-none">
            <option value="popular">Most Popular</option>
            <option value="recent">Most Recent</option>
            <option value="downloads">Most Downloaded</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchStorage;
