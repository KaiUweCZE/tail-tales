import React from "react";
import { Save, Mail, Lock, UserX, Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-100 mb-8">Settings</h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Tailwind configuration form */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-amber-100 mb-6">
              Style Configuration
            </h2>
            <form className="space-y-4">
              {["h1", "h2", "h3", "p", "img", "table", "tr", "th", "td"].map(
                (element) => (
                  <div key={element} className="flex items-center space-x-4">
                    <label className="w-24 text-amber-50 font-medium">
                      {element}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Tailwind classes"
                      className="flex-1 bg-slate-700 text-amber-50 rounded px-4 py-2 border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder-slate-400"
                    />
                  </div>
                )
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md font-medium transition-colors"
                >
                  <Save size={20} />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right column - User administration */}
          <div className="space-y-6">
            {/* Profile Settings Card */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-amber-100 mb-6">
                Profile Settings
              </h2>
              <div className="space-y-4">
                <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-amber-50 rounded-md transition-colors flex items-center space-x-3">
                  <Mail className="text-amber-500" size={20} />
                  <span>Add Email</span>
                </button>
                <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-amber-50 rounded-md transition-colors flex items-center space-x-3">
                  <Lock className="text-amber-500" size={20} />
                  <span>Change Password</span>
                </button>
                <button className="w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-md transition-colors flex items-center space-x-3">
                  <UserX size={20} />
                  <span>Delete User</span>
                </button>
              </div>
            </div>

            {/* Configurations Card */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-amber-100 mb-6">
                Configurations
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700 rounded-md">
                  <div className="flex items-center justify-between text-amber-50">
                    <span className="font-medium">Current Config:</span>
                    <span>default</span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-md transition-colors flex items-center justify-center space-x-3">
                  <Settings size={20} />
                  <span>Create New Configuration</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
