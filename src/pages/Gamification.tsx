import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const badges = [
  { title: "Logging Streak", desc: "7 days in a row", tone: "primary" },
  { title: "Stable Days", desc: "3 days < 70% time-in-range", tone: "secondary" },
  { title: "Hydration Hero", desc: "Drank water with 5 meals", tone: "accent" },
];

export default function Gamification() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Progress & Badges",
    "description": "Motivational badges and streaks to encourage healthy logging.",
  };

  return (
    <>
      <SEO title="Progress & Badges • GlucoLoop" description="Stay motivated with streaks and weekly progress badges." canonical={window.location.href} jsonLd={jsonLd} />
      <Navbar />
      <main className="container py-8">
        <section className="grid gap-6 md:grid-cols-3">
          {badges.map((b) => (
            <Card key={b.title} className="transition hover:shadow-lg">
              <CardHeader>
                <CardTitle>{b.title}</CardTitle>
                <CardDescription>{b.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Earned</Badge>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
}
