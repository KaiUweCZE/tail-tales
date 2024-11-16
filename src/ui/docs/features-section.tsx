const FeaturesSection = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-amber-200 mb-6">
        Key Features
      </h2>
      <div className="space-y-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Element Styling</h3>
          <p className="text-slate-300 mb-4">
            Apply Tailwind classes to any element for custom styling. Set
            default classes in Settings for consistent formatting across your
            notes.
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Default Styles</h3>
          <p className="text-slate-300 mb-4">
            Configure default Tailwind classes for different elements in
            Settings. These styles will be automatically applied to new elements
            while remaining fully customizable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
