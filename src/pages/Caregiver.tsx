import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Caregiver() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Caregiver View",
    "description": "Read-only dashboard to monitor trends (demo)",
  };

  return (
    <>
      <SEO title="Caregiver View • GlucoLoop" description="Read-only access to trends for caregivers and clinicians." canonical={window.location.href} jsonLd={jsonLd} />
      <Navbar />
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Caregiver View</CardTitle>
            <CardDescription>Invite-only, read-only access (demo)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Coming soon: shareable access code, alerts, and summaries.</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
