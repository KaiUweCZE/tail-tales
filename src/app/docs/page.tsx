import FeaturesSection from "@/ui/docs/features-section";
import ShortcutsSection from "@/ui/docs/shortcuts-section";
import TipsTricks from "@/ui/docs/tips-tricks";

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
          <FeaturesSection />

          {/* Keyboard Shortcuts Section */}
          <ShortcutsSection />

          {/* Tips & Tricks Section */}
          <TipsTricks />
        </div>
      </div>
    </main>
  );
};

export default DocsPage;
