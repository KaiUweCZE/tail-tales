import Button from "@/ui/primitives/button";
import Link from "next/link";
/* eslint-disable react/no-unescaped-entities */
export default function Home() {
  return (
    <main className="mx-auto px-2">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Hero section */}
        <section className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Notes that
            <br />
            <span className="text-amber-200">look exceptional</span>
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
            Create beautifully formatted notes with an intuitive interface.
            Style your text exactly how you want using Tailwind's powerful
            utilities.
          </p>
        </section>

        {/* Main features section */}
        <section className="mt-24 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Write notes your way</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Say goodbye to complicated formatting. With our editor and
              Tailwind CSS, you'll create perfectly styled notes in moments.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Simple yet powerful</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Skip the complex setup. Start writing and formatting instantly
              with pre-built Tailwind styles at your fingertips.
            </p>
          </div>

          {/* Testimonial */}
          <blockquote className="border-l-4 border-amber-200 pl-6 py-4 my-8">
            <p className="text-xl italic text-slate-300">
              "Finally, a note-taking app where I can style my content exactly
              how I need it. The Tailwind integration is brilliant!"
            </p>
            <footer className="mt-4 text-sm text-slate-400">
              — Happy User
            </footer>
          </blockquote>

          {/* Call to action */}
          <div className="pt-8">
            <Link href="login">
              <Button variant="hero" size="lg">
                Start Taking Notes
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
