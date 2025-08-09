import { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TARGET_BGL = 110; // mg/dL

export default function Dose() {
  const [carbs, setCarbs] = useState(60);
  const [bgl, setBgl] = useState(160);
  const [carbRatio, setCarbRatio] = useState(10); // grams per unit
  const [correctionFactor, setCorrectionFactor] = useState(50); // mg/dL per unit
  const [activity, setActivity] = useState("none");
  const [stress, setStress] = useState("normal");

  const activityMultiplier = useMemo(() => {
    switch (activity) {
      case "low":
        return 0.9;
      case "high":
        return 0.75;
      default:
        return 1;
    }
  }, [activity]);

  const stressMultiplier = useMemo(() => {
    switch (stress) {
      case "high":
        return 1.15;
      case "low":
        return 0.95;
      default:
        return 1;
    }
  }, [stress]);

  const calc = useMemo(() => {
    const carbUnits = carbs / Math.max(1, carbRatio);
    const correctionUnits = Math.max(0, (bgl - TARGET_BGL)) / Math.max(1, correctionFactor);
    const raw = (carbUnits + correctionUnits) * activityMultiplier * stressMultiplier;
    const suggested = Math.max(0, Math.round(raw * 10) / 10);
    return { carbUnits, correctionUnits, activityMultiplier, stressMultiplier, suggested };
  }, [carbs, bgl, carbRatio, correctionFactor, activityMultiplier, stressMultiplier]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Dose Suggestion",
    "description": "Calculate transparent, personalized insulin dose suggestions (pilot demo)",
  };

  return (
    <>
      <SEO title="Dose Suggestion • GlucoLoop" description="Transparent insulin dose suggestions with carbs, BGL, activity, and stress inputs." canonical={window.location.href} jsonLd={jsonLd} />
      <Navbar />
      <main className="container py-8">
        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Dose Suggestion</CardTitle>
              <CardDescription>We recommend based on carbs + correction + activity + stress</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input id="carbs" type="number" min={0} value={carbs} onChange={(e) => setCarbs(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="bgl">Current BGL (mg/dL)</Label>
                  <Input id="bgl" type="number" min={0} value={bgl} onChange={(e) => setBgl(Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carbRatio">Carb Ratio (g/u)</Label>
                  <Input id="carbRatio" type="number" min={1} value={carbRatio} onChange={(e) => setCarbRatio(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="cf">Correction Factor (mg/dL per u)</Label>
                  <Input id="cf" type="number" min={1} value={correctionFactor} onChange={(e) => setCorrectionFactor(Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Activity</Label>
                  <Select value={activity} onValueChange={setActivity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="low">Light (walk)</SelectItem>
                      <SelectItem value="high">Intense (sport)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Stress</Label>
                  <Select value={stress} onValueChange={setStress}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stress" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button variant="hero" size="lg">Calculate</Button>
                <span className="text-sm text-muted-foreground">Target {TARGET_BGL} mg/dL</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggestion</CardTitle>
              <CardDescription>Transparent breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-md border p-4">
                <p className="text-sm">Carb units: <strong>{calc.carbUnits.toFixed(1)} u</strong></p>
                <p className="text-sm">Correction units: <strong>{calc.correctionUnits.toFixed(1)} u</strong></p>
                <p className="text-sm">Activity factor: <strong>x{calc.activityMultiplier.toFixed(2)}</strong></p>
                <p className="text-sm">Stress factor: <strong>x{calc.stressMultiplier.toFixed(2)}</strong></p>
              </div>
              <div className="rounded-md border p-4">
                <p className="text-lg font-semibold">Recommended dose</p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-primary">{calc.suggested.toFixed(1)} u</p>
                <p className="mt-2 text-xs text-muted-foreground">This pilot demo is for educational purposes only and not medical advice. Always confirm with your clinician.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
