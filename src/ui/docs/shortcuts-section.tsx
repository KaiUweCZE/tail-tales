const ShortcutsSection = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-amber-200 mb-6">
        Keyboard Shortcuts
      </h2>
      <div className="grid gap-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Line Break</span>
            <kbd className="bg-slate-700 px-3 py-1 rounded text-sm">Enter</kbd>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            Creates &lt;br/&gt; when used mid-text, exits element when used at
            the end
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
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Indent Text</span>
            <kbd className="bg-slate-700 px-3 py-1 rounded text-sm">Tab</kbd>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            Adds 4 spaces of indentation at cursor position
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Move Element</span>
            <kbd className="bg-slate-700 px-3 py-1 rounded text-sm">
              Alt + ↑/↓
            </kbd>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            Move current element up or down in its parent
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShortcutsSection;
