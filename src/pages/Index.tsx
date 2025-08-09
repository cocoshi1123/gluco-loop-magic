import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-glucoloop.jpg";

const Index = () => {
  return (
    <>
      <SEO title="GlucoLoop • Diabetes Dose Assistant (Pilot)" description="Personalized, transparent insulin dose suggestions. Mobile-first pilot demo." canonical={window.location.href} jsonLd={{"@context":"https://schema.org","@type":"SoftwareApplication","name":"GlucoLoop","applicationCategory":"HealthApplication","operatingSystem":"iOS, Android, Web"}} />
      <Navbar />
      <main className="container hero-aurora py-12">
        <section className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">Take the guesswork out of insulin dosing</h1>
            <p className="mb-6 text-lg text-muted-foreground">GlucoLoop combines food, activity, and stress to suggest personalized doses—clearly explained, always under your control.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/dose"><Button variant="hero" size="lg">Start a Dose</Button></Link>
              <Link to="/history"><Button variant="premium" size="lg">View Trends</Button></Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Pilot demo — not medical advice.</p>
          </div>
          <div className="relative">
            <img src={hero} alt="GlucoLoop hero: mobile UI showing glucose trends and meal analysis" className="mx-auto w-full max-w-xl rounded-xl border shadow-lg" loading="lazy" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
