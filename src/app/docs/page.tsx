const DocsPage = () => {
  return (
    <main>
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-12">Documentation</h1>

          {/* Getting Started Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-amber-200 mb-6">
              Getting Started
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Create beautifully formatted notes using HTML elements and
              Tailwind CSS. Customize your writing experience with default
              styles and keyboard shortcuts.
            </p>
          </section>

          {/* Key Features Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-amber-200 mb-6">
              Key Features
            </h2>
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Element Styling</h3>
                <p className="text-slate-300 mb-4">
                  Apply Tailwind classes to any element for custom styling. Set
                  default classes in Settings for consistent formatting across
                  your notes.
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Default Styles</h3>
                <p className="text-slate-300 mb-4">
                  Configure default Tailwind classes for different elements in
                  Settings. These styles will be automatically applied to new
                  elements while remaining fully customizable.
                </p>
              </div>
            </div>
          </section>

          {/* Keyboard Shortcuts Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-amber-200 mb-6">
              Keyboard Shortcuts
            </h2>
            <div className="grid gap-4">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Line Break</span>
                  <kbd className="bg-slate-700 px-3 py-1 rounded text-sm">
                    Enter
                  </kbd>
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  Creates &lt;br/&gt; when used mid-text, exits element when
                  used at the end
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Force Line Break</span>
                  <kbd className="bg-slate-700 px-3 py-1 rounded text-sm">
                    Shift + Enter
                  </kbd>
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  Always creates &lt;br/&gt; within current element
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Exit to Root</span>
                  <kbd className="bg-slate-700 px-3 py-1 rounded text-sm">
                    Ctrl + Enter
                  </kbd>
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  Moves cursor to root element level
                </p>
              </div>
            </div>
          </section>

          {/* Tips & Tricks Section */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-200 mb-6">
              Tips & Tricks
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="text-amber-200">•</span>
                Configure your most-used styles in Settings to speed up
                note-taking
              </li>
              <li className="flex gap-3">
                <span className="text-amber-200">•</span>
                Use Shift+Enter for quick line breaks without leaving your
                current element
              </li>
              <li className="flex gap-3">
                <span className="text-amber-200">•</span>
                Combine default styles with custom Tailwind classes for maximum
                flexibility
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default DocsPage;
