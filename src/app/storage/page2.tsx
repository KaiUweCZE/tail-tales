"use client";
import { Search, Heart, Download, Share2, Filter, Eye } from "lucide-react";
import { useState } from "react";

const StoragePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stylePresets = [
    {
      id: 1,
      title: "Minimalist Blog",
      author: "Kai",
      likes: 234,
      downloads: "1.2k",
      category: "blog",
      preview: {
        h1: "text-5xl font-light text-white",
        p: "text-gray-300 leading-loose text-lg",
        button:
          "border-2 border-white text-white hover:bg-white hover:text-black rounded-none",
      },
    },
    {
      id: 2,
      title: "Tech Documentation",
      author: "Sarah",
      likes: 187,
      downloads: "856",
      category: "docs",
      preview: {
        h1: "text-3xl font-bold text-blue-300",
        p: "text-gray-300 leading-relaxed",
        button: "bg-blue-500 hover:bg-blue-600 text-white rounded-md",
      },
    },
    {
      id: 3,
      title: "Creative Portfolio",
      author: "Mike",
      likes: 342,
      downloads: "1.5k",
      category: "portfolio",
      preview: {
        h1: "text-6xl font-black text-amber-200",
        p: "text-gray-300 leading-tight text-xl",
        button:
          "bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full",
      },
    },
  ];

  return (
    <main>
      <div className="sticky top-0 bg-[#0a0f1c]/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-amber-200">
              Discover Styles
            </h1>
            <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg">
              <Share2 size={18} />
              Share Your Style
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, author, or category..."
                className="w-full bg-gray-800/50 text-white rounded-lg pl-12 pr-4 py-2 border border-gray-700 focus:border-amber-200 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-lg border border-gray-700">
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-4 text-gray-400">
            {["all", "blog", "docs", "portfolio", "landing"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-amber-500/20 text-amber-200"
                    : "hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stylePresets.map((preset) => (
            <div
              key={preset.id}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              {/* Preview Section */}
              <div className="p-8 bg-gray-900/50">
                <h1 className={preset.preview.h1}>Sample Heading</h1>
                <p className={`${preset.preview.p} mt-4`}>
                  Experience the perfect balance of typography, spacing, and
                  color with this carefully crafted style preset.
                </p>
                <button className={`${preset.preview.button} px-6 py-2 mt-6`}>
                  Take Action
                </button>
              </div>

              {/* Info Overlay - Appears on Hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-6 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {preset.title}
                    </h3>
                    <p className="text-gray-400">by {preset.author}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-amber-200 bg-gray-800/50 rounded-lg">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-amber-200 bg-gray-800/50 rounded-lg">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart size={16} /> {preset.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download size={16} /> {preset.downloads}
                    </span>
                  </div>
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Download size={16} />
                    Use Style
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default StoragePage;
