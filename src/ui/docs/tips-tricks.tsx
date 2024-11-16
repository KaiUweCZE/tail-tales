const TipsTricks = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-amber-200 mb-6">
        Tips & Tricks
      </h2>
      <ul className="space-y-4 text-slate-300">
        <li className="flex gap-3">
          <span className="text-amber-200">•</span>
          Configure your most-used styles in Settings to speed up note-taking
        </li>
        <li className="flex gap-3">
          <span className="text-amber-200">•</span>
          Use Shift+Enter for quick line breaks without leaving your current
          element
        </li>
        <li className="flex gap-3">
          <span className="text-amber-200">•</span>
          Combine default styles with custom Tailwind classes for maximum
          flexibility
        </li>
        <li className="flex gap-3">
          <span className="text-amber-200">•</span>
          Use Alt + Arrow keys to quickly reorganize your content
        </li>
      </ul>
    </section>
  );
};

export default TipsTricks;
